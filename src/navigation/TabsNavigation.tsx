import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainNavigator from './MainNavigator';
import Settings from '../screens/Settings/Settings';
import ITheme from '../themes/interfaces';

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  const { t } = useTranslation();
  const { colors: { tabBarBackground, tabBarLabelColor, tabBarActiveLabel } } = useTheme() as ITheme;
  const { top } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: tabBarBackground,
    },
    tabBarLabel: {
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.container,
        tabBarIcon: () => null,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarInactiveTintColor: `${tabBarLabelColor}81`,
        tabBarActiveTintColor: tabBarActiveLabel,
        headerStyle: {
          height: top,
        },
      }}
    >
      <Tab.Screen name={t('main')} component={MainNavigator} />
      <Tab.Screen name={t('settings')} component={Settings} />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
