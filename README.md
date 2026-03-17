# Hummel App

A React Native mobile app built with [Expo](https://expo.dev).

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device (for physical device testing)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npx expo start
```

This will open the Expo developer tools in your browser and display a QR code in the terminal.

## Running the App

### On a Physical Device

1. Install the **Expo Go** app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Scan the QR code shown in the terminal with your camera (iOS) or the Expo Go app (Android).

### On an Emulator / Simulator

| Platform | Command             | Requirement                              |
|----------|---------------------|------------------------------------------|
| Android  | `npm run android`   | Android Studio + emulator running        |
| iOS      | `npm run ios`       | macOS + Xcode installed                  |
| Web      | `npm run web`       | Any modern browser                       |

## Project Structure

```
.
├── App.js          # Root application component
├── index.js        # Entry point
├── app.json        # Expo configuration
├── assets/         # Images, fonts, and other static files
└── package.json    # Dependencies and scripts
```

## Available Scripts

| Script                | Description                          |
|-----------------------|--------------------------------------|
| `npx expo start`      | Start the development server         |
| `npm run android`     | Run on Android emulator/device       |
| `npm run ios`         | Run on iOS simulator/device (macOS)  |
| `npm run web`         | Run in the browser                   |

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/docs/)
