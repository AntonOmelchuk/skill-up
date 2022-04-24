import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Main from '../screens/Main/Main';
import Animations from '../screens/Animations/Animations';
import CornerMovement from '../screens/Animations/animations/CornerMovement';
import StaggeredDrag from '../screens/Animations/animations/StaggeredDrag';
import SwipeCards from '../screens/Animations/animations/SwipeCards';
import AnimatedForm from '../screens/Animations/animations/AnimatedForm';
import ProgressBar from '../screens/Animations/animations/ProgressBar';
import PhotoGrid from '../screens/Animations/animations/PhotoGrid';
import AnimatedMenu from '../screens/Animations/animations/AnimatedMenu';
import ScreenBreakdown from '../screens/Animations/animations/ScreenBreakdown';
import ITheme from '../themes/interfaces';
import { MainStackNavigatorParamList } from './interfaces/mainNavigator.interface';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainNavigator: FC = () => {
  const { t } = useTranslation();
  const { colors: { screenLabel } } = useTheme() as ITheme;

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: screenLabel,
      headerBackTitleVisible: false,
    }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Animations" component={Animations} />
      <Stack.Screen
        name="CornerMovement"
        component={CornerMovement}
        options={{
          headerTitle: t('cornerAnimations'),
        }}
      />
      <Stack.Screen
        name="StaggeredDrag"
        component={StaggeredDrag}
        options={{
          headerTitle: t('staggeredDrag'),
        }}
      />
      <Stack.Screen
        name="SwipeCards"
        component={SwipeCards}
        options={{
          headerTitle: t('swipeCards'),
        }}
      />
      <Stack.Screen
        name="AnimatedForm"
        component={AnimatedForm}
        options={{
          headerTitle: t('animatedForm'),
        }}
      />
      <Stack.Screen
        name="ProgressBar"
        component={ProgressBar}
        options={{
          headerTitle: t('progressBar'),
        }}
      />
      <Stack.Screen
        name="PhotoGrid"
        component={PhotoGrid}
        options={{
          headerTitle: t('photoGrid'),
        }}
      />
      <Stack.Screen
        name="AnimatedMenu"
        component={AnimatedMenu}
        options={{
          headerTitle: t('animatedMenu'),
        }}
      />
      <Stack.Screen
        name="ScreenBreakdown"
        component={ScreenBreakdown}
        options={{
          headerTitle: t('screenBreakdown'),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
