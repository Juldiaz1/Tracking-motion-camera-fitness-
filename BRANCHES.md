# Branch Structure

- `main` — stable integrated branch
- `develop` — integration/development branch
- `feature/camera-pose` — pose visibility and landmark smoothing
- `feature/exercise-engine` — squat, push-up, lunge, and plank analysis
- `feature/workout-ui` — exercise catalog and selection foundation
- `feature/backend` — workout API service layer
- `feature/testing` — pose test fixtures

## Push every branch to GitHub

```bash
git remote add origin https://github.com/Juldiaz1/Tracking-motion-camera-fitness-.git
git push -u origin main
git push -u origin develop
git push -u origin feature/camera-pose
git push -u origin feature/exercise-engine
git push -u origin feature/workout-ui
git push -u origin feature/backend
git push -u origin feature/testing
```
