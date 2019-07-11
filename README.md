# care-provider-app

This is a React Native app for Care Provider App.

### Install

* In the project root directory, run `yarn install` or simply `yarn`.
* `cd ios/ && pod install`

#iOS
### Run the project

* `yarn start`
* Open Xcode and run the project

### Deploying

* `npm run ios:build`
* Archive from Xcode
* checkout the `production` branch before releasing
* Usual steps
* Remember to check the upload on appstore.apple.com once it's done processing to approve the compliance questions!


# Android
### Run the project

_TODO: Fix the below line to be dynamic_
* edit android/local.properties to point to your android sdk  (src: https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil)
* plug in your Android device to your computer
* make sure your device is in Developer/Debug mode
* `yarn start`
* `react-native run-android`

### Release to Google Play Store

1. `cd android`
2. Edit the `versionCode` and `versionName` in `app/build.gradle`
3. `./gradlew bundleRelease`
4. Test build locally in release mode `react-native run-android --variant=release`
5. Upload the `android/app/build/outputs/bundle/release/app.aab` to the Google Play Store
* follow setup instructions here for the first time setup: https://facebook.github.io/react-native/docs/signed-apk-android


### Troublshooting
- Clean Gradle local cache `cd android && gradlew cleanBuildCache` src: https://stackoverflow.com/a/30450020/1895126
- Clean Gradle global `rm -rf $HOME/.gradle/caches/` src: https://stackoverflow.com/a/30450020/1895126

# Reactotron
Reactotron is setup for this project, which provides helpful debugging.

Get started by installing the Desktop application.

Note, for Android debugging, you will need to run `adb reverse tcp:9090 tcp:9090`
