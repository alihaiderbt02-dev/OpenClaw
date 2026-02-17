@echo off
rem OpenClaw Gateway (v2026.2.6-3)
set PATH=C:\nvm4w\nodejs;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Program Files\cursor\resources\app\bin;C:\Program Files\Docker\Docker\resources\bin;C:\Users\PC\AppData\Local\nvm;C:\Users\Ali Haider\AppData\Local\pnpm;C:\Users\Ali Haider\AppData\Local\Microsoft\WindowsApps;C:\Users\Ali Haider\AppData\Local\Programs\Git\cmd;C:\Users\Ali Haider\AppData\Local\Programs\Microsoft VS Code\bin;C:\Users\Ali Haider\.deno\bin;C:\Users\Ali Haider\AppData\Local\Programs\Ollama;C:\Users\Ali Haider\AppData\Local\Python\bin
set OPENCLAW_GATEWAY_PORT=18789
set OPENCLAW_GATEWAY_TOKEN=379eb808f2b10d22549ae34f92fd5237b48aa16fd8aa8dae
set OPENCLAW_SYSTEMD_UNIT=openclaw-gateway.service
set OPENCLAW_SERVICE_MARKER=openclaw
set OPENCLAW_SERVICE_KIND=gateway
set OPENCLAW_SERVICE_VERSION=2026.2.6-3
C:\nvm4w\nodejs\node.exe C:\Users\PC\AppData\Local\nvm\v22.12.0\node_modules\openclaw\dist\index.js gateway --port 18789
