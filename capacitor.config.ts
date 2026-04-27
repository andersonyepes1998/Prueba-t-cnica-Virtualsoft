import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.virtualsoft.app',
  appName: 'VirtualSoft',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: 'none'
    }
  }
};

export default config;