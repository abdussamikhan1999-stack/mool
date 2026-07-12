@echo off
REM ── Reclaims wasteful temp/cache + Windows component store.
REM ── RIGHT-CLICK this file -> "Run as administrator".

echo === Clearing user + Windows temp and web cache ===
del /q /f /s "%TEMP%\*" >nul 2>&1
del /q /f /s "C:\Windows\Temp\*" >nul 2>&1
del /q /f /s "%LOCALAPPDATA%\Microsoft\Windows\INetCache\*" >nul 2>&1

echo === Emptying Recycle Bin ===
powershell -NoProfile -Command "Clear-RecycleBin -Force -ErrorAction SilentlyContinue"

echo === Trimming Windows component store (WinSxS) - may take several minutes ===
dism /online /cleanup-image /startcomponentcleanup

echo.
echo ============================================================
echo  Done: temp/cache cleared, Recycle Bin emptied, WinSxS trimmed.
echo ============================================================
pause
