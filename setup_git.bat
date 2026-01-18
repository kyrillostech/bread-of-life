@echo off
echo Initializing Git...
git init
git add .
git commit -m "Initial commit: Bread of Life - Bible Planner"
echo.
echo Git repository initialized and files committed!
echo.
echo Next steps:
echo 1. Go to https://github.com/new and create a repository named 'bread-of-life'
echo 2. Run the following commands:
echo    git branch -M main
echo    git remote add origin https://github.com/kyrillostech/bread-of-life.git
echo    git push -u origin main
pause
