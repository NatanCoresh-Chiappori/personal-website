# Quick script to push changes to your live website
# Double-click this file or run it in PowerShell: .\push-changes.ps1

Write-Host "🚀 Pushing changes to live website..." -ForegroundColor Cyan
Write-Host ""

# Check if there are any changes
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No changes to commit. Everything is up to date!" -ForegroundColor Green
    exit
}

# Stage all changes
Write-Host "📦 Staging changes..." -ForegroundColor Yellow
git add .

# Prompt for commit message
Write-Host ""
$commitMessage = Read-Host "Enter commit message (e.g., 'Update: added new project')"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update: changes"
}

# Commit changes
Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "✅ Done! Netlify will auto-deploy your changes in ~30 seconds." -ForegroundColor Green
Write-Host "   Check your Netlify dashboard for deployment status." -ForegroundColor Green
Write-Host ""

