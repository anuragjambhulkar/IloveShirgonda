const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure we are in the frontend directory
const projectDir = __dirname;
process.chdir(projectDir);

try {
    console.log('🚀 Starting build process...');

    // 1. Run build
    console.log('📦 Running "npm run build"...');
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Check if build directory exists
    const buildDir = path.join(projectDir, 'build');
    if (!fs.existsSync(buildDir)) {
        console.error('❌ Error: build directory not found. Build might have failed.');
        process.exit(1);
    }

    // 3. Create zip
    const zipName = 'shrigonda_build.zip';
    console.log(`🗜️ Creating zip: ${zipName}...`);

    if (process.platform === 'win32') {
        // Windows: Use PowerShell's Compress-Archive
        execSync(`powershell -Command "Compress-Archive -Path '${buildDir}\\*' -DestinationPath '${zipName}' -Force"`);
    } else {
        // Linux/macOS: Use zip command
        execSync(`zip -r "${zipName}" build/`);
    }

    console.log(`✅ Build and zip completed successfully!`);
    console.log(`📂 Zip file: ${path.join(projectDir, zipName)}`);

} catch (error) {
    console.error('❌ An error occurred:', error.message);
    process.exit(1);
}
