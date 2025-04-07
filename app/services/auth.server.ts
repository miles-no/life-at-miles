import { OAuth2Client } from "google-auth-library";
import { createCookieSessionStorage, redirect } from "react-router";
import type { UserProfile } from "~/types/UserProfile";

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

const sessionStorage = createCookieSessionStorage({
cookie: {
    name: "google_auth_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
},
});

export function getGoogleAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
    
    return oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });
  }

export async function handleGoogleCallback(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  
  if (!code) {
    return redirect("/login?error=missing_code");
  }
  
  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    
    // Get user info
    const { data } = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    
    // Create session
    const session = await sessionStorage.getSession();
    session.set("user", data);
    session.set("access_token", tokens.access_token);
    
    // Save session and redirect
    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return redirect("/login?error=auth_failed");
  }
}
  
export async function getCurrentUser(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  
  const user = session.get("user");
  if (!user) return null;
  
  return user;
}
  
export async function requireAuth(request: Request) {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw redirect("/login", {
      headers: {
        "WWW-Authenticate": "Bearer",
      },
    });
  }
  
  return user as UserProfile;
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}