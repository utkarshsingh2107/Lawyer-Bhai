# PowerShell script to permanently fix Node.js and Git PATH issues
# Run this as Administrator for system-wide changes, or as regular user for user-level changes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "LawyerBhai - PATH Fix Utility" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$pathsToAdd = @(
    @{
        Name = "Node.js"
        Path = "C:\Program Files\nodejs\"
        TestFile = "node.exe"
    },
    @{
        Name = "Git"
        Path = "C:\Program Files\Git\cmd"
        TestFile = "git.exe"
    }
)

$pathsAdded = 0
$pathsAlreadyPresent = 0
$pathsNotFound = 0

foreach ($item in $pathsToAdd) {
    Write-Host "Checking $($item.Name)..." -ForegroundColor Yellow
    
    $fullTestPath = Join-Path $item.Path $item.TestFile
    
    if (Test-Path $fullTestPath) {
        Write-Host "  ✓ $($item.Name) found at: $($item.Path)" -ForegroundColor Green
        
        # Get current user PATH
        $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
        
        if ($currentPath -like "*$($item.Path)*") {
            Write-Host "  ✓ Already in PATH" -ForegroundColor Green
            $pathsAlreadyPresent++
        } else {
            try {
                # Add to user PATH
                $newPath = $currentPath + ";" + $item.Path
                [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
                Write-Host "  ✓ Added to PATH successfully!" -ForegroundColor Green
                $pathsAdded++
            } catch {
                Write-Host "  ✗ Failed to add to PATH: $_" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "  ✗ $($item.Name) not found at: $($item.Path)" -ForegroundColor Red
        Write-Host "    Please install $($item.Name) first" -ForegroundColor Yellow
        $pathsNotFound++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Paths added: $pathsAdded" -ForegroundColor Green
Write-Host "  Already present: $pathsAlreadyPresent" -ForegroundColor Yellow
Write-Host "  Not found: $pathsNotFound" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($pathsAdded -gt 0) {
    Write-Host "IMPORTANT: Restart your terminal/IDE for changes to take effect!" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Testing commands in current session..." -ForegroundColor Cyan
Write-Host ""

# Test in current session
$env:Path += ";C:\Program Files\nodejs\;C:\Program Files\Git\cmd"

try {
    $nodeVersion = & node --version 2>&1
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js: Not working" -ForegroundColor Red
}

try {
    $npmVersion = & npm --version 2>&1
    Write-Host "✓ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm: Not working" -ForegroundColor Red
}

try {
    $gitVersion = & git --version 2>&1
    Write-Host "✓ Git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git: Not working" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Close and reopen your terminal/IDE" -ForegroundColor White
Write-Host "2. Test: node --version" -ForegroundColor White
Write-Host "3. Test: npm --version" -ForegroundColor White
Write-Host "4. Test: git --version" -ForegroundColor White
Write-Host "5. Run: npm run dev" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
