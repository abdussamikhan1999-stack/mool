@echo off
REM ── Starts Docker's privileged service so the engine can come up.
REM ── RIGHT-CLICK this file -> "Run as administrator".
echo Setting com.docker.service to start automatically...
sc config com.docker.service start= auto
echo Starting com.docker.service...
net start com.docker.service
echo.
echo ============================================================
echo  Service handled. Make sure Docker Desktop is open and wait
echo  ~30-60s for the green whale / "Engine running".
echo  Then verify:   docker version   (look for a "Server:" block)
echo ============================================================
pause
