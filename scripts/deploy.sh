#!/bin/bash

# Portfolio Deployment Script
echo "🚀 Starting portfolio deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Format code
echo "✨ Formatting code..."
npm run format

# Build the project
echo "🏗️ Building project..."
npm run build

# Test the build
echo "🧪 Testing build..."
npm start &
SERVER_PID=$!
sleep 5

# Check if server is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Build test successful!"
    kill $SERVER_PID
else
    echo "❌ Build test failed!"
    kill $SERVER_PID
    exit 1
fi

echo "🎉 Deployment ready! Push to your hosting platform."
