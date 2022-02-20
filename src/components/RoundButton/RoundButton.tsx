import React, { FC } from 'react';
import {
  Pressable, Image, Text, StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import ITheme from '../../themes/interfaces';
import IRoundButton from './interfaces/roundButton.interface';

const RoundButton: FC<IRoundButton> = ({
  bgColor,
  extraStyles = {},
  icon,
  title = '',
  onPress,
}) => {
  const { colors: { blackWhite, background } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColor || blackWhite,
      elevation: 4,
      shadowOpacity: 0.4,
      shadowRadius: 4,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      ...extraStyles,
    },
    icon: {
      width: 45,
      height: 45,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 14,
      color: background,
      fontWeight: '700',
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress && onPress}>
      {icon
        ? <Image source={icon} style={styles.icon} />
        : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
};

export default RoundButton;
