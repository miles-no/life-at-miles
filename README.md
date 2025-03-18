# Life at Miles Backend

Backend API for the Life at Miles web application.

## Prerequisites
- .NET 9.0 SDK
- Docker (optional)

## Development

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/miles-no/life-at-miles-backend.git
   cd life-at-miles-backend
   ```

2. Update the Google Client ID in `src/LifeAtMiles.Api/appsettings.json`

3. Run the API:
   ```bash
   cd src/LifeAtMiles.Api
   dotnet run
   ```

4. Access Swagger UI at https://localhost:5001/swagger

### Docker
Build and run the API using Docker:
```bash
cd src/LifeAtMiles.Api
docker build -t life-at-miles-api .
docker run -p 8080:80 life-at-miles-api
```

## Authentication
The API uses Google authentication. All endpoints require a valid Google JWT token from the Miles organization domain.

## Project Structure 