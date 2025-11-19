@echo off
echo Pushing changes to live website...
echo.

REM Stage all changes
echo Staging changes...
git add .

REM Check if there are any changes to commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes to commit. Everything is up to date!
    pause
    exit /b
)

REM Auto-generate commit message with timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%

REM Commit with auto-generated message
echo Committing changes...
git commit -m "Update: %timestamp%"

REM Pull first to sync with remote
echo Syncing with remote...
git pull --rebase >nul 2>&1

REM Push to GitHub
echo Pushing to GitHub...
git push

echo.
echo Done! Netlify will auto-deploy your changes in ~30 seconds.
echo Check your Netlify dashboard for deployment status.
echo.
pause

