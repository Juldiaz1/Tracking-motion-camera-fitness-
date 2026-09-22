$ErrorActionPreference = "Stop"

$remote = "https://github.com/Juldiaz1/Tracking-motion-camera-fitness-.git"

if (-not (git remote)) {
    git remote add origin $remote
}

$branches = @(
    "main",
    "develop",
    "feature/camera-pose",
    "feature/exercise-engine",
    "feature/workout-ui",
    "feature/backend",
    "feature/testing"
)

foreach ($branch in $branches) {
    git push -u origin $branch
}

Write-Host "All project branches were pushed."
