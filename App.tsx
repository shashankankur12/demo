import React from 'react';
import{AuthLoading} from './src/screens/auth/organisms/AuthLoading'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './src/styles/theme';
import { ThemeProvider } from '@shopify/restyle';
import { composeComponents } from './src/utils/component';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadAssets from './src/utils/LoadAssets';
import { I18nProvider } from './src/locales/I18nProvider';
import { AuthProvider } from './src/context/Authentication';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { ChatProvider } from './src/context/Chat';

const Providers = composeComponents(
  SafeAreaProvider,
  AuthProvider,
  ChatProvider,
);

const paperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <LoadAssets>
      <Providers>
        <I18nProvider>
          <PaperProvider theme={paperTheme}>
            <ThemeProvider theme={theme}>
              <FlashMessage position="top" />
              <AuthLoading />
            </ThemeProvider>
          </PaperProvider>
        </I18nProvider>
      </Providers>
    </LoadAssets>
   
  );
};

export default App;
