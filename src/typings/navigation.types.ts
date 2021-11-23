import { StackScreenProps } from '@react-navigation/stack';
import { ProfileFormType, RegisterFormType } from './auth.types';

export type Routes =
  | 'Login';

export type AuthStackParamList = {
  Login: undefined
};

export type MainStackParamList = {

};

export type RegistrationStackParamList = {
};

export type ProfileDetailsProps = StackScreenProps<
  AuthStackParamList
>;

export type CreatePasswordProps = StackScreenProps<
  AuthStackParamList
>;
