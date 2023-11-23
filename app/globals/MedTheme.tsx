// MedTheme.tsx

import {extendTheme} from 'native-base';

const MedTheme = extendTheme({
  // Define your custom theme here
  // For example, you can customize colors, typography, etc.
  colors: {
    primary: '#31729D',
  },
   // Disable gesture globally
   defaultScreenOptions: {
    gestureEnabled: false,
  },
  // ...
});

export default MedTheme;
