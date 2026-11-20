@echo off
echo ========================================================
echo  Starting Recruitment & Job Application Platform
echo  Docker Compose Multi-Container Stack
echo ========================================================
echo.

docker compose up --build -d

echo.
echo ========================================================
echo  Services started!
echo  - Frontend:   http://localhost (or http://localhost:4200)
echo  - Backend:    http://localhost:8080/api
echo  - Swagger UI: http://localhost:8080/swagger-ui.html
echo  - phpMyAdmin: http://localhost:8081
echo ========================================================
pause
