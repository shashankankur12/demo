import { StackScreenProps } from '@react-navigation/stack';
import { ProfileFormType, RegisterFormType } from './auth.types';

export type Routes =
  | 'Login'
  | 'Account'
  | 'ChangePassword'
  | 'ForgotPassword'
  | 'CreatePassword'
  | 'CreateNewPassword'
  | 'ProfileDetails'
  | 'AccountConfirmation'
  | 'PasswordResetConfirmation'
  | 'PatientConfirmation'
  | 'Register'
  | 'PersonalInformation'
  | 'Profile'
  | 'AccountSettings'
  | 'About'
  | 'PrivacyPolicy'
  | 'EditDetails'
  | 'TermsAndCondition';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  Reset: { otp: string };
  Success: undefined;
  CreatePassword: { profileFormData: ProfileFormType };
  CreateNewPassword: undefined;
  AccountConfirmation: undefined;
  PatientConfirmation: undefined;
  Register: undefined;
  ProfileDetails: { registerFormData: RegisterFormType };
  PasswordResetConfirmation: undefined;
  Account: undefined;
};

export type MainStackParamList = {
  ChangePassword: undefined;
  PersonalInformation: undefined;
  Profile: undefined;
  EditDetails: undefined;
  AccountSettings: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  TermsAndCondition: undefined;
};

export type RegistrationStackParamList = {
  Invitation: undefined;
  Register: undefined;
  ProfileDetails: undefined;
  Confirmation: undefined;
  TermsAndCondition: undefined;
  PrivacyPolicy: undefined;
};

export type ProfileDetailsProps = StackScreenProps<
  AuthStackParamList,
  'ProfileDetails'
>;

export type CreatePasswordProps = StackScreenProps<
  AuthStackParamList,
  'CreatePassword'
>;
