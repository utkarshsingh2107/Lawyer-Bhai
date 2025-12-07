@echo off
cls
echo ========================================
echo   LawyerBhai - Development Server
echo ========================================
echo.
echo IMPORTANT: Node.js PATH Issue Fixed!
echo.

REM Add Node.js to PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs\

echo Checking Node.js...
node --version
npm --version
echo.

echo Starting development server...
echo.
echo Server will be available at:
echo   http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev

pause
