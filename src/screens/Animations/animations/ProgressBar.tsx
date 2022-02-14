import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, Text, StyleSheet, Animated, Pressable,
} from 'react-native';
import ITheme from '../../../themes/interfaces';

const ProgressBar = () => {
  const { colors: { background, mainText, success } } = useTheme() as ITheme;
  const { t } = useTranslation();

  const animationValue = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
    },
    button: {
      width: 210,
      height: 45,
      borderRadius: 3,
      backgroundColor: success,
      justifyContent: 'center',
      alignItems: 'center',
    },
    animatedView: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    text: {
      color: mainText,
      textTransform: 'uppercase',
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
    },
  });

  const progressInterpolate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const colorInterpolate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(71, 255, 99)', 'rgb(99, 71, 255)'],
  });

  const animationProgressStyles = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: colorInterpolate,
  };

  const onPressHanlder = () => {
    animationValue.setValue(0);

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={onPressHanlder}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.animatedView, animationProgressStyles]} />
        </View>
        <Text style={styles.text}>{t('login')}</Text>
      </Pressable>
    </View>
  );
};

export default ProgressBar;
