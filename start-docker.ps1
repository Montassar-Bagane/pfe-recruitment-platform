Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Starting Recruitment Platform (Docker Stack)" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

docker compose up --build -d

Write-Host "`nStack deployed successfully!" -ForegroundColor Green
Write-Host " - Frontend Web App: http://localhost:4200 (or http://localhost)" -ForegroundColor Yellow
Write-Host " - Spring Boot API:  http://localhost:8080" -ForegroundColor Yellow
Write-Host " - Swagger / OpenAPI: http://localhost:8080/swagger-ui.html" -ForegroundColor Yellow
Write-Host " - phpMyAdmin:       http://localhost:8081" -ForegroundColor Yellow
