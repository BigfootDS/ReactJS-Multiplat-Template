# BigfootDS Ionic Capacitor Multiplat Template

A template for a ReactJS front-end app built with TypeScript and Vite.

This template uses Ionic Capacitor to get to other platforms;

- Web (Ionic Capacitor)
- Web-based Progressive Web App (PWA) (Ionic Capacitor)
- iOS (Ionic Capacitor, Xcode)
- Android (Ionic Capacitor, Android Studio)
- Windows (Ionic Capacitor, ElectronJS)
- Ubuntu (Ionic Capacitor, ElectronJS)
- MacOS (Ionic Capacitor, ElectronJS)

## First-Time Setup Steps

For when you make a brand-new project (NOT just cloning this repo, but making a new repo!):

1. Create the React + Vite app: `npm create vite@latest .`
2. Install its dependencies if you didn't from the previous step: `npm install`
3. Add Capacitor to the project: `npm install @capacitor/core`
4. Add the Capacitor CLI to the project: `npm install --save-dev @capacitor/cli`
5. Initialise Capacitor: `npx cap init`
6. Build the ReactJS app: `npm run build`
7. Initialise the Android project: `npx cap add android`
8. Initialise an app logo/asset generator per the documentation here: https://capacitorjs.com/docs/guides/splash-screens-and-icons 
9. Modify the `capacitor.config.ts` file so that it refers to the Android keystore for App installer signing:
```typescript
	import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bigfootds.fidgettoys',
  appName: "Bigfoot's Fidget Toys",
  webDir: 'dist',
  android: {
    buildOptions: {
      releaseType: "AAB",
      keystorePath: "./release-keystore",
      keystorePassword: "SomeBetterPasswordOrEnvValueHere1",
      keystoreAlias: "SomeBetterAliasOrEnvValueHere",
      keystoreAliasPassword: "SomeBetterPasswordOrEnvValueHere2"
    }
  }
};

export default config;
```
10. Ensure Android Studio is installed on your development PC and ensure that it has a version of an Android SDK installed within it.
11. Run `npx cap open android` to open the project in Android Studio.
12. Keep an eye out for any prompts to upgrade the project from within Android Studio. Do them.
13. Using Android Studio, make a key store per the relevant bit of this guide, and save the key store file to the `android` folder in this repo: https://ionic.io/blog/building-and-releasing-your-capacitor-android-app 
14. If you make any changes to the ReactJS app at this point, you must tell the Android app to sync those changes into it: `npx cap sync`
15. With an Android phone with developer mode & USB Debugging enabled and plugged into the computer, run `npx cap run android` to build and run the app to your phone.


## General Workflow Steps

For people working in this repo after it's already been created:

1. Do your ReactJS work.
3. Preview your ReactJS app in a web browser, if you don't have too much mobile-specific functionality: `npm run dev`
3. Sync the ReactJS app into the Capacitor Android project, and run the Android project: `npm run android:run`
4. Build the Android app when ready to make an installable file: `npm run android:build`