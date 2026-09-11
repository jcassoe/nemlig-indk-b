#!/usr/bin/env bash
set -euo pipefail

export DISPLAY=:99
mkdir -p .runtime

if ! pgrep -f "Xvfb :99" >/dev/null 2>&1; then
  nohup Xvfb :99 -screen 0 1440x900x24 -ac >.runtime/xvfb.log 2>&1 &
  sleep 1
fi

if ! pgrep -f "fluxbox" >/dev/null 2>&1; then
  nohup fluxbox >.runtime/fluxbox.log 2>&1 &
  sleep 1
fi

if ! pgrep -f "x11vnc.*:99" >/dev/null 2>&1; then
  nohup x11vnc -display :99 -forever -shared -nopw -rfbport 5900 >.runtime/x11vnc.log 2>&1 &
  sleep 1
fi

if ! pgrep -f "websockify.*6080" >/dev/null 2>&1; then
  nohup websockify --web=/usr/share/novnc/ 6080 localhost:5900 >.runtime/novnc.log 2>&1 &
  sleep 1
fi

echo "Remote desktop is running on port 6080."
echo "In GitHub Codespaces, open the PORTS tab and open port 6080 in your browser."
echo "Then run: npm run nemlig:login"
