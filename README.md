# diagnostics-paper

Azure Portal Extensions Dashboard implemented in Expo with React Native Paper

## Developer Workflow

This project uses npm scripts to manage common development tasks.

### Running the App

- `npm start`: Starts the Expo development server
- `npm run android`: Starts the app on an Android emulator or device
- `npm run ios`: Starts the app on an iOS simulator or device
- `npm run web`: Starts the app in a web browser

## Building the App

- `npm run build:web`: Exports the app for web deployment

### Testing

- `npm run test`: Runs the test suite once
- `npm run test:coverage`: Runs tests with coverage reporting
- `npm run test:watch`: Runs tests in watch mode

### Linting and Formatting

- `npm run check`: Performs TypeScript type checking without emitting files
- `npm run format`: Formats code with Prettier
- `npm run lint`: Runs all linting checks (ESLint and Prettier)
- `npm run lint:eslint`: Runs ESLint checks
- `npm run lint:prettier`: Checks code formatting with Prettier

## Dependencies

This project relies on several key dependencies.

### [Expo](https://docs.expo.dev/)

A framework and platform for universal React applications, providing tools and services for building, deploying, and quickly iterating on iOS, Android, and web apps.

### [React Native](https://reactnative.dev/docs/getting-started)

A framework for building native apps using React, allowing code sharing across platforms.

### [React Native Paper](https://callstack.github.io/react-native-paper/)

A material design library for React Native, providing cross-platform UI components following Google's Material Design guidelines.

## Theme

This app follows the user's system color scheme using React Native's `useColorScheme` hook (works on iOS, Android and when using `react-native-web` in Expo). The `PaperProvider` automatically switches between Material 3 light and dark themes.
