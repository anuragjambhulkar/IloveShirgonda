<?php
// PHP Script to fix cPanel Git synchronization issues
// Visit this file in your browser to force-reset the Git state on the server.

$repo_path = "/home/iloveshr/ILS"; // Path from your screenshot

echo "<h2>Checking Git Status...</h2>";
echo "<pre>";
passthru("cd $repo_path && git status 2>&1");
echo "</pre>";

echo "<h2>Force Resetting to origin/main...</h2>";
echo "<pre>";
// Fetch latest and reset - this fixes the 'system cannot deploy' or 'greyed out' button
passthru("cd $repo_path && git fetch origin 2>&1");
passthru("cd $repo_path && git reset --hard origin/main 2>&1");
echo "</pre>";

echo "<h2>Status after fix:</h2>";
echo "<pre>";
passthru("cd $repo_path && git status 2>&1");
echo "</pre>";

echo "<h3>Done! Now go back to cPanel and the Deploy button should be enabled.</h3>";
?>
