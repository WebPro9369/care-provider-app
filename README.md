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

### Troublshooting
- Clean Gradle local cache `cd android && gradlew cleanBuildCache` src: https://stackoverflow.com/a/30450020/1895126
- Clean Gradle global `rm -rf $HOME/.gradle/caches/` src: https://stackoverflow.com/a/30450020/1895126
