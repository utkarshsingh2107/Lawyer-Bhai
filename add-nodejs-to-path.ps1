# PowerShell script to permanently add Node.js to PATH
# Run this as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Add Node.js to System PATH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$nodePath = "C:\Program Files\nodejs\"

# Check if Node.js exists
if (Test-Path $nodePath) {
    Write-Host "✓ Node.js found at: $nodePath" -ForegroundColor Green
    
    # Get current system PATH
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    
    # Check if Node.js is already in PATH
    if ($currentPath -like "*$nodePath*") {
        Write-Host "✓ Node.js is already in system PATH" -ForegroundColor Yellow
    } else {
        Write-Host "Adding Node.js to system PATH..." -ForegroundColor Yellow
        
        try {
            # Add Node.js to system PATH
            $newPath = $currentPath + ";" + $nodePath
            [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
            
            Write-Host "✓ Node.js added to system PATH successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "IMPORTANT: You need to restart your terminal/IDE for changes to take effect!" -ForegroundColor Yellow
            Write-Host ""
        } catch {
            Write-Host "✗ ERROR: Failed to add Node.js to PATH" -ForegroundColor Red
            Write-Host "Please run this script as Administrator" -ForegroundColor Red
            Write-Host ""
            Write-Host "To run as Administrator:" -ForegroundColor Cyan
            Write-Host "1. Right-click on PowerShell" -ForegroundColor Cyan
            Write-Host "2. Select 'Run as Administrator'" -ForegroundColor Cyan
            Write-Host "3. Run: .\add-nodejs-to-path.ps1" -ForegroundColor Cyan
        }
    }
    
    # Also add npm global modules path
    $npmPath = "$env:APPDATA\npm"
    if ($currentPath -notlike "*$npmPath*") {
        Write-Host "Adding npm global modules to PATH..." -ForegroundColor Yellow
        try {
            $newPath = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + $npmPath
            [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
            Write-Host "✓ npm global modules path added!" -ForegroundColor Green
        } catch {
            Write-Host "Note: Could not add npm global path (requires admin)" -ForegroundColor Yellow
        }
    }
    
} else {
    Write-Host "✗ ERROR: Node.js not found at $nodePath" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart your terminal/IDE" -ForegroundColor White
Write-Host "2. Run: node --version" -ForegroundColor White
Write-Host "3. Run: npm --version" -ForegroundColor White
Write-Host "4. Run: npm install" -ForegroundColor White
Write-Host "5. Run: npm run dev" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
