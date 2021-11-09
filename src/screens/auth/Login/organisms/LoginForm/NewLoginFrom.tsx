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
  validateRequiredUserId,
} from 'utils/validators';
import { navigate } from 'services/NavigationService';
import { FormPasswordInput } from 'molecules/FormPasswordInput/FormPasswordInput';
import { FormUserIdInput } from 'molecules/FormUserIdInput';

export type FormValues = {
  userId: string;
  password: string;
};

export const loginValidationSchema = yup.object().shape({
  userId: validateRequiredUserId(),
  password: validateRequiredPassword(),
});

const initialValues = {
  userId: '',
  password: '',
};

type LoginFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
};

export const NewLoginForm = ({ loading, onSubmit }: LoginFormProps) => {
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
            <Text variant="headlineSemibold" localeId="new.login.titel" my="xl" />
            <FormUserIdInput />
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
              backgroundColor="darkRed"
              borderColor="darkRed"
              onPress={handleSubmit as any}
              title="new.login.button.titel"
            />
          </Box>
        );
      }}
    </Formik>
  );
};
