# Stage 1: Build React SPA
FROM node:20-alpine AS client-build
WORKDIR /app/ClientApp
COPY src/NextgenClass.Web/ClientApp/package*.json ./
RUN npm ci
COPY src/NextgenClass.Web/ClientApp/ ./
RUN npm run build

# Stage 2: Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS dotnet-build
WORKDIR /app
COPY src/NextgenClass.Web/*.csproj ./src/NextgenClass.Web/
RUN dotnet restore src/NextgenClass.Web/NextgenClass.Web.csproj
COPY src/NextgenClass.Web/ ./src/NextgenClass.Web/
COPY --from=client-build /app/wwwroot ./src/NextgenClass.Web/wwwroot/
RUN dotnet publish src/NextgenClass.Web/NextgenClass.Web.csproj -c Release -o /publish --no-restore

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS runtime
WORKDIR /app
COPY --from=dotnet-build /publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "NextgenClass.Web.dll"]
