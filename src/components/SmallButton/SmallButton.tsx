import React, { FC, memo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ITheme from '../../themes/interfaces';
import ISmallButton from './interfaces';

const SmallButton: FC<ISmallButton> = ({
  onPress, title, containerStyle, titleStyle, isDisabled,
}) => {
  const { colors: { blackWhite, tabBarActiveLabel } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    container: {
      width: 72,
      height: 63,
      borderRadius: 36,
      backgroundColor: blackWhite,
      justifyContent: 'center',
      alignContent: 'center',
      ...containerStyle,
      opacity: isDisabled ? 0.72 : 1,
    },
    title: {
      fontSize: 25,
      fontWeight: '600',
      color: tabBarActiveLabel,
      textAlign: 'center',
      textTransform: 'capitalize',
      ...titleStyle,
      opacity: isDisabled ? 0.45 : 1,
    },
  });

  return (
    <Pressable
      onPress={() => {
        if (!isDisabled) {
          onPress();
        }
      }}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default memo(SmallButton);
