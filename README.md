# Motion Fitness Tracker

Cross-platform React Native fitness tracking app for Android, iPhone, and tablets.

## Current implementation

- Live camera-based body pose tracking
- Front/back camera switching
- Body landmark callback handling
- Landmark normalization
- Joint-angle calculation
- Initial squat repetition counter
- Tracking status and knee-angle display
- Expo SDK 57 / React Native 0.86 foundation

## Install

```bash
npm install
```

## Android

This project uses a native React Native module, so use a native development build.

```bash
npx expo prebuild
npx expo run:android
```

## iOS

iOS native builds require macOS/Xcode.

```bash
npx expo prebuild
npx expo run:ios
```

## Development stages

1. Verify pose tracking on physical Android and iPhone devices.
2. Add exercise selection.
3. Add push-ups, lunges, planks, and additional exercises.
4. Add motion smoothing and confidence thresholds.
5. Add workout/session storage.
6. Add backend API integration.
7. Add analytics and progress dashboards.
8. Evaluate Fit3D-derived data only after confirming licensing and intended use.

## Architecture

```text
App.tsx
  -> MediaPipe camera
  -> landmark extraction
  -> pose utilities
  -> exercise analyzer
  -> workout/session layer
  -> backend integration
```

## Important

The pose package is a native React Native module. Do not expect this project to run in Expo Go without native-module support.
