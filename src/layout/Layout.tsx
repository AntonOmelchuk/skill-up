import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Loader from '../components/Loader/Loader';
import ILayout from './interfaces/layout.interface';
import ITheme from '../themes/interfaces';
import { BarStyle } from '../constants/defines';

const Layout: FC<ILayout> = ({
  children,
  style = {},
  bottomSafeArea = false,
  topSafeArea = false,
  withLoader = false,
  barStyle = BarStyle.Light,
}) => {
  const { colors: { background } } = useTheme() as ITheme;
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      ...(bottomSafeArea && { paddingBottom: insets?.bottom }),
      ...(topSafeArea && { paddingTop: insets?.top }),
      padding: 16,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle={barStyle} backgroundColor={background} />
      {children}
      {withLoader && <Loader />}
    </View>
  );
};

export default Layout;
