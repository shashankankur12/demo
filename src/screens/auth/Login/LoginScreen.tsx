import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Box } from 'atoms/Box';
import { keyboardBehavior } from 'utils/device';
import { FormValues, LoginForm } from './organisms/LoginForm';
import { Divider } from 'atoms/Divider';
import { Button } from 'molecules/Button';
import { ImageBase } from 'atoms/Image';
import { Text } from 'atoms/Text';
import { IMAGES } from '../../../utils/staticAssets';
import useAuth from 'context/Authentication';
import { navigate } from 'services/NavigationService';

export const LoginScreen = () => {
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

  const onPressAccount = () => {
    navigate('Account');
  };

  return (
    <Box bg="whiteText" flex={1}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}>
        <Box flex={1} alignItems="center" justifyContent="center" mt="l">
          <ImageBase
            source={IMAGES.APP_LOGO}
            style={{ width: 100, height: 100 }}
          />
          <Text
            variant="body"
            textTransform="uppercase"
            pt="s"
            letterSpacing={1}
            localeId="login.logo.text"
          />
        </Box>
        <Box>
          <KeyboardAvoidingView behavior={keyboardBehavior}>
            <LoginForm loading={loginLoading} onSubmit={handleLogin} />
          </KeyboardAvoidingView>
          <Divider my="xxl" />
          <Button
            width="90%"
            alignSelf="center"
            variant="secondary"
            onPress={onPressAccount}
            title="createAccount.button.text"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
