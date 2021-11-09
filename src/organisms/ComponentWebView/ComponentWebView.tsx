import React from 'react';
import { Box } from 'atoms/Box';
import { Navbar } from 'molecules/Navbar';
import { WebView } from 'react-native-webview';
import { LocaleString } from 'locales/en';

type ComponentWebViewProps = {
  title: LocaleString;
  uri: string;
};

export const ComponentWebView = ({ uri, title }: ComponentWebViewProps) => {
  return (
    <Box flex={1}>
      <Navbar backIcon showBack title={title} />
      <WebView startInLoadingState={true} source={{ uri: uri }} />
    </Box>
  );
};
