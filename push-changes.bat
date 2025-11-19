@echo off
echo 🚀 Pushing changes to live website...
echo.

REM Stage all changes
echo 📦 Staging changes...
git add .

REM Prompt for commit message
set /p commitMsg="Enter commit message (e.g., 'Update: added new project'): "

if "%commitMsg%"=="" set commitMsg=Update: changes

REM Commit changes
echo.
echo 💾 Committing changes...
git commit -m "%commitMsg%"

REM Push to GitHub
echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Done! Netlify will auto-deploy your changes in ~30 seconds.
echo    Check your Netlify dashboard for deployment status.
echo.
pause

