import * as React from 'react';
import {
  NavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import { Routes } from 'typings/navigation.types';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<T extends Record<any, any>>(name: Routes, params?: T) {
  navigationRef.current?.navigate(name, params);
}

export function replace<T extends Record<any, any>>(name: Routes, params?: T) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
