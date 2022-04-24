import React, { useState, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { t } from 'i18next';
import RoundButton from '../../../components/RoundButton/RoundButton';
import ITheme from '../../../themes/interfaces';

const AnimatedMenu = () => {
  const { colors: { background, success, danger } } = useTheme() as ITheme;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const animationValue = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: background,
    },
    button: {
      position: 'absolute',
      bottom: 40,
      right: 20,
    },
  });

  const onMainButtonPressHandler = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsOpen((prev) => !prev));
  };

  const successButtonStyles = {
    transform: [
      { scale: animationValue },
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -90],
        }),
      },
    ],
  };

  const dangerButtonStyles = {
    transform: [
      { scale: animationValue },
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180],
        }),
      },
    ],
  };

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.button, successButtonStyles]}>
        <RoundButton
          onPress={onMainButtonPressHandler}
          bgColor={success}
          title="Buy"
        />
      </Animated.View>
      <Animated.View style={[styles.button, dangerButtonStyles]}>
        <RoundButton
          onPress={onMainButtonPressHandler}
          bgColor={danger}
          title={t('cancel')}
        />
      </Animated.View>
      <RoundButton
        onPress={onMainButtonPressHandler}
        extraStyles={styles.button}
        title="5.00$"
      />
    </View>
  );
};

export default AnimatedMenu;
