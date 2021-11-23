import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewLoginScreen } from './auth/Login';

import {
  AuthStackParamList,
  MainStackParamList,
  RegistrationStackParamList,
} from 'typings/navigation.types';
import { Home } from './main/home';


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
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
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
    </AuthStack.Navigator>
  );
};

export const Registration = () => {
  return (
    <RegistrationStack.Navigator screenOptions={{ headerShown: false }}>
    </RegistrationStack.Navigator>
  );
};
