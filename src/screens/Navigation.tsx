import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewLoginScreen } from './auth/Login';
import { ForgotPassword } from './auth/ForgotPassword';
import { OtpInput } from './auth/OtpInput';
import { Register } from './auth/Register';
import { CreatePassword } from './auth/CreatePassword';
import { ProfileDetails } from './auth/ProfileDetails';
import { AccountConfirmation } from './auth/AccountConfirmation';
import { PasswordResetConfirmation } from './auth/PasswordResetConfirmation';
import { PatientConfirmation } from './auth/PatientConfirmation';
import {
  AuthStackParamList,
  MainStackParamList,
  RegistrationStackParamList,
} from 'typings/navigation.types';
import { CreateNewPassword } from './auth/CreatePassword/CreateNewPassword';
import { AccountSettings } from './Main/AccountSettings';
import { About } from './Main/About';
import { ChangePassword } from './Main/ChangePassword';
import { TabNavigator } from './tab-navigation';
import { PrivacyPolicy } from './Main/PrivacyPolicy';
import { TermsAndCondition } from './Main/TermsAndCondition';
import { PersonalInformation } from './auth/PersonalInformation/PersonalInformation';
import { EditDetails } from './auth/EditDetails';

const MainStack = createStackNavigator<MainStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();

export const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="TabHome"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen name="EditDetails" component={EditDetails} />
      <MainStack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="About" component={About} />
      <MainStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <MainStack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
      />

      <MainStack.Screen name="AccountSettings" component={AccountSettings} />
    </MainStack.Navigator>
  );
};

export const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={NewLoginScreen} />
      <AuthStack.Screen name="Account" component={Registration} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
      <AuthStack.Screen name="CreatePassword" component={CreatePassword} />
      <AuthStack.Screen
        name="AccountConfirmation"
        component={AccountConfirmation}
      />
      <AuthStack.Screen
        name="PasswordResetConfirmation"
        component={PasswordResetConfirmation}
      />
      <AuthStack.Screen
        name="PatientConfirmation"
        component={PatientConfirmation}
      />
    </AuthStack.Navigator>
  );
};

export const Registration = () => {
  return (
    <RegistrationStack.Navigator screenOptions={{ headerShown: false }}>
      <RegistrationStack.Screen name="Invitation" component={OtpInput} />
      <RegistrationStack.Screen name="Register" component={Register} />
      <RegistrationStack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
      />
      <RegistrationStack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
      />
      <RegistrationStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
    </RegistrationStack.Navigator>
  );
};
