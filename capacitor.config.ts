import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.aulapadel.app',
  appName: 'AulaPadel',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
     SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  },
  
};

export default config;
