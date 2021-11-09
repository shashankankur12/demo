import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Box } from 'atoms/Box';
import { keyboardBehavior } from 'utils/device';
import { FormValues, NewLoginForm } from './organisms/LoginForm';
import { ImageBase } from 'atoms/Image';
import { Text } from 'atoms/Text';
import { IMAGES } from '../../../utils/staticAssets';
import useAuth from 'context/Authentication';
import { Card } from 'atoms/Card';

export const NewLoginScreen = () => {
  const {
    state: { loginLoading },
    actions: { login },
  } = useAuth();

  const handleLogin = (values: FormValues) => {
    const { email, password } = values;
    const loginInputs = {
      email,
      password,
    };
    login(loginInputs);
  };

  return (
    <Box bg="whiteText" flex={1} justifyContent="center">
      
      <Card m="l" bg="lightBlack" paddingVertical='ml'>
      
        <Box alignItems="center" width="90%" alignSelf="center" mt="mll" >
          <ImageBase
            source={IMAGES.NEW_APP_LOGO}
            style={{ width: 100, height: 100 }}
          />
          <Text
            variant="body"
            textTransform="uppercase"
            pt="s"
            letterSpacing={1}
            localeId="new.login.logo.text"
          />
        </Box>
        <Box>
          <KeyboardAvoidingView behavior={keyboardBehavior}>
            <NewLoginForm loading={loginLoading} onSubmit={handleLogin} />
          </KeyboardAvoidingView>
        
        </Box>

      </Card>
    
    </Box>
  );
};
