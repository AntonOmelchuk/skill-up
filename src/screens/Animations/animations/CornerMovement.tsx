import React, { useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Animated, TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Layout from '../../../layout/Layout';
import ITheme from '../../../themes/interfaces';
import { HEIGHT, WIDTH } from '../../../constants/general';

const CornerMovement = () => {
  const animationValue = useRef(new Animated.ValueXY()).current;
  const VIEW_HEIGHT = 120;
  const VIEW_WIDTH = 120;

  const { colors: { background, blackWhite } } = useTheme() as ITheme;

  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
    },

    box: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      borderRadius: 60,
      backgroundColor: blackWhite,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });

  const startAnimation = () => {
    Animated.sequence([
      Animated.spring(animationValue.y, {
        toValue: HEIGHT - (VIEW_HEIGHT + bottom + tabBarHeight + VIEW_HEIGHT / 2),
        useNativeDriver: false,
      }),
      Animated.spring(animationValue.x, {
        toValue: WIDTH - VIEW_WIDTH,
        useNativeDriver: false,
      }),
      Animated.spring(animationValue.y, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(animationValue.x, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animationStyles = {
    top: animationValue.y,
    left: animationValue.x,
  };

  return (
    <Layout style={styles.screen}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animationStyles]} />
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default CornerMovement;
