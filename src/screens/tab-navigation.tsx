import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Profile } from './Main/Profile';
import { Icon } from 'atoms/Icon';
import { Home } from './Main/home';
import { AdminChat } from './Main/AdminChat';

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#3B4D75"
      barStyle={{ backgroundColor: '#ffffff' }}>
      <Tab.Screen
        name="Appointments"
        component={Home}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'calendar-filled' : 'calendar-unfilled'}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={AdminChat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused, color }) => (
            <Icon name="chat" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'profile-filled' : 'profile'}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
