# PowerShell script to start a local development server
Write-Host "Starting local development server..." -ForegroundColor Green
Write-Host ""
Write-Host "Your website will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Try Python 3 first
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Python..." -ForegroundColor Green
        python -m http.server 8000
        exit
    }
} catch {
    # Python 3 not found, try Python 2
}

# Try Python 2
try {
    $python2Version = python2 --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Python 2..." -ForegroundColor Green
        python2 -m SimpleHTTPServer 8000
        exit
    }
} catch {
    # Python 2 not found
}

# Try Node.js http-server
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Python not found. Using Node.js..." -ForegroundColor Green
        Write-Host "Installing http-server globally (if not already installed)..." -ForegroundColor Yellow
        npm install -g http-server 2>&1 | Out-Null
        Write-Host "Starting http-server..." -ForegroundColor Green
        http-server -p 8000 -o
        exit
    }
} catch {
    # Node.js not found
}

# If nothing works, use PowerShell's built-in web server (requires .NET)
Write-Host "Attempting to use PowerShell built-in web server..." -ForegroundColor Yellow
Write-Host ""

$port = 8000
$url = "http://localhost:$port/"

# Create a simple HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "Server started at $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Open browser
Start-Process $url

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')
        
        if (Test-Path $filePath) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            
            # Set content type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentTypes = @{
                '.html' = 'text/html'
                '.css' = 'text/css'
                '.js' = 'application/javascript'
                '.json' = 'application/json'
                '.png' = 'image/png'
                '.jpg' = 'image/jpeg'
                '.jpeg' = 'image/jpeg'
                '.gif' = 'image/gif'
                '.svg' = 'image/svg+xml'
                '.pdf' = 'application/pdf'
            }
            $response.ContentType = if ($contentTypes.ContainsKey($ext)) { $contentTypes[$ext] } else { 'application/octet-stream' }
            
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Red
}

