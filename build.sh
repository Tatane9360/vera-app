#!/bin/bash
set -e

# Build the project
npx nx build client --configuration=production

# Debug: list what's in the output directory
echo "=== Contents of dist/apps/client ==="
ls -la dist/apps/client
echo "=== End listing ==="

# If browser folder exists, flatten it
if [ -d "dist/apps/client/browser" ]; then
  echo "Browser folder found, flattening..."
  cp -r dist/apps/client/browser/* dist/apps/client/
  rm -rf dist/apps/client/browser
  echo "Flattening complete"
else
  echo "No browser folder found, files are already in the correct location"
fi
