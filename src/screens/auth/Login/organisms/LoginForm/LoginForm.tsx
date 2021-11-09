import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Box } from 'atoms/Box';
import * as yup from 'yup';
import { Text } from 'atoms/Text';
import { TextButton } from 'atoms/TextButton';
import { Button } from 'molecules/Button';
import {
  validateRequiredEmail,
  validateRequiredPassword,
} from 'utils/validators';
import { navigate } from 'services/NavigationService';
import { FormPasswordInput } from 'molecules/FormPasswordInput/FormPasswordInput';
import { FormEmailInput } from 'molecules/FormEmailInput';

export type FormValues = {
  email: string;
  password: string;
};

export const loginValidationSchema = yup.object().shape({
  email: validateRequiredEmail(),
  password: validateRequiredPassword(),
});

const initialValues = {
  email: '',
  password: '',
};

type LoginFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
};

export const LoginForm = ({ loading, onSubmit }: LoginFormProps) => {
  const handleForgotPassword = () => {
    navigate('ForgotPassword');
  };

  return (
    <Formik<FormValues>
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({ handleSubmit, isValid, dirty }) => {
        return (
          <Box width="90%" alignSelf="center">
            <Text variant="headlineSemibold" localeId="login.title" my="xl" />
            <FormEmailInput />
            <FormPasswordInput />

            <Box alignSelf="flex-end">
              <TextButton
                variant="bodyMedium"
                onPress={handleForgotPassword}
                localeId="login.forgotpassword"
                pb="l"
              />
            </Box>

            <Button
              loading={loading}
              variant="primary"
              onPress={handleSubmit as any}
              title="login.button.text"
            />
          </Box>
        );
      }}
    </Formik>
  );
};
