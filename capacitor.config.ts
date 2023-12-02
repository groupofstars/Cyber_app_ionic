import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.techdefendershub.app',
  appName: 'Tech Defenders Hub',
  webDir: 'www',
  server: {
    androidScheme: 'http',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    }
  },
  android: {
    allowMixedContent: true,
  }
};

export default config;
