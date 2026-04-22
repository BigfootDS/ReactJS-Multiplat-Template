import type { CapacitorConfig } from '@capacitor/cli';


// TODO: Eventually implement the keystore as an env variable;
// https://github.com/Cap-go/capacitor-env

const config: CapacitorConfig = {
  appId: 'com.bigfootds.projectid',
  appName: 'BIGFOOTDS PROJECT NAME',
  webDir: 'dist',
  android: {
    buildOptions: {
      releaseType: "AAB",
      keystorePath: "./release-keystore",
      keystorePassword: "SomeBetterPasswordOrEnvValueHere1",
      keystoreAlias: "SomeBetterAliasOrEnvValueHere",
      keystoreAliasPassword: "SomeBetterPasswordOrEnvValueHere2"
    }
  },
  
};

export default config;