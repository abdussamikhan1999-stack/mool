@echo off
REM ── Installs the WSL2 engine Docker Desktop needs (Windows 11 Home).
REM ── RIGHT-CLICK this file and choose "Run as administrator".
echo Installing WSL2 (no extra Linux distro; Docker ships its own)...
wsl --install --no-distribution
echo.
echo ============================================================
echo  Done. Now REBOOT your PC, then launch Docker Desktop and
echo  wait for the whale icon / "Engine running" (green).
echo ============================================================
pause
