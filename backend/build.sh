#!/bin/bash

# Render Build Script for Shopping Cart Backend

echo "🔨 Starting build process..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Download dependencies
echo "📦 Downloading Go dependencies..."
go mod download

# Verify dependencies
echo "🔍 Verifying Go modules..."
go mod verify

# Build the application
echo "🏗️ Building Go application..."
go build -o main .

# Check if build was successful
if [ -f "main" ]; then
    echo "✅ Build successful! Binary created: main"
    echo "📊 Binary size: $(du -h main | cut -f1)"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🚀 Ready for deployment!"
