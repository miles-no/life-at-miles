import { exec } from "node:child_process"
import fs from "node:fs"
import https from "node:https"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to fetch the latest LTS versions of Node.js
function getLatestLTSVersions() {
  return new Promise((resolve, reject) => {
    console.log("🔍 Fetching the latest LTS versions of Node.js...")
    https
      .get("https://nodejs.org/dist/index.json", (res) => {
        let data = ""
        res.on("data", (chunk) => {
          data += chunk
        })
        res.on("end", () => {
          try {
            const versions = JSON.parse(data)
            const ltsVersions = versions
              .filter((v) => v.lts)
              .map((v) => v.version.slice(1)) // Remove the 'v' prefix
            console.log("✅ Successfully fetched the latest LTS versions.")
            resolve(ltsVersions)
          } catch (error) {
            console.error("❌ Error parsing Node.js versions:", error)
            reject(error)
          }
        })
      })
      .on("error", (error) => {
        console.error("❌ Error fetching Node.js versions:", error)
        reject(error)
      })
  })
}

// Function to check if a Docker image exists
function checkDockerImageExists(nodeVersion) {
  return new Promise((resolve) => {
    console.log(
      `🔍 Checking if Docker image for Node.js ${nodeVersion}-slim exists...`,
    )
    exec(`docker manifest inspect node:${nodeVersion}-slim`, (error) => {
      if (error) {
        console.log(
          `❌ Docker image for Node.js ${nodeVersion}-slim does not exist.`,
        )
        resolve(false)
      } else {
        console.log(`✅ Docker image for Node.js ${nodeVersion}-slim exists.`)
        resolve(true)
      }
    })
  })
}

// Function to normalize line endings and ensure final newline
function normalizeFileContent(filePath) {
  console.log(`🔧 Normalizing file content for ${filePath}...`)
  const content = fs.readFileSync(filePath, "utf8")
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\n*$/, "\n")
  fs.writeFileSync(filePath, normalizedContent, "utf8")
  console.log(`✅ Normalized file content for ${filePath}.`)
}

// Function to update the Dockerfile with the latest Node.js version
function updateDockerfile(nodeVersion) {
  const dockerfilePath = path.join(__dirname, "..", "Dockerfile")
  console.log(`🔧 Updating Dockerfile to use Node.js ${nodeVersion}-slim...`)
  let dockerfileContent = fs.readFileSync(dockerfilePath, "utf8")
  dockerfileContent = dockerfileContent.replace(
    /FROM node:\d+\.\d+\.\d+-slim/g,
    `FROM node:${nodeVersion}-slim`,
  )
  fs.writeFileSync(dockerfilePath, dockerfileContent, "utf8")
  normalizeFileContent(dockerfilePath)
  console.log(`✅ Updated Dockerfile to use Node.js ${nodeVersion}-slim.`)
}

// Main function to update files
async function updateNodeVersion() {
  try {
    console.log("🚀 Starting Node.js version update process...")
    const ltsVersions = await getLatestLTSVersions()
    for (const version of ltsVersions) {
      const dockerImageExists = await checkDockerImageExists(version)
      if (dockerImageExists) {
        // Update .nvmrc file
        const nvmrcPath = path.join(__dirname, "..", ".nvmrc")
        console.log(`🔧 Updating .nvmrc to ${version}...`)
        fs.writeFileSync(nvmrcPath, version, "utf8")
        normalizeFileContent(nvmrcPath)
        console.log(`✅ Updated .nvmrc to ${version}.`)

        // Update package.json file
        const packageJsonPath = path.join(__dirname, "..", "package.json")
        console.log(
          `🔧 Updating package.json to use Node.js ${version} in engines field...`,
        )
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
        packageJson.engines = packageJson.engines || {}
        packageJson.engines.node = version

        // Write package.json with proper formatting and ensure a newline at the end
        fs.writeFileSync(
          packageJsonPath,
          `${JSON.stringify(packageJson, null, 2)}\n`,
          "utf8",
        )
        console.log(
          `✅ Updated package.json to use Node.js ${version} in engines field.`,
        )

        // Update Dockerfile
        updateDockerfile(version)
        console.log("🎉 Node.js version update process completed successfully.")
        return
      }
    }
    console.log("⚠️ No common Node.js version found in LTS and Docker images.")
  } catch (error) {
    console.error("❌ Error updating Node.js version:", error)
  }
}

// Run the update function
updateNodeVersion()
