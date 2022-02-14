import React, { FC } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ITheme from '../../themes/interfaces';
import ISwitch from './interfaces';

const CustomSwitch: FC<ISwitch> = ({ enabled, handler }) => {
  const { colors: { switchTrackColor, switchThumbColor } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
  });

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ true: switchTrackColor }}
        thumbColor={switchThumbColor}
        onChange={handler}
        value={enabled}
      />
    </View>
  );
};

export default CustomSwitch;
