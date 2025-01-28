import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calculator.app',
  appName: 'Kyrie Calc Pro',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PWA: {
      enabled: true,
    }
  }
};

export default config;