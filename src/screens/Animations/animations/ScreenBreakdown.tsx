import React, { useRef } from 'react';
import {
  View, StyleSheet, ScrollView, Animated,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import ITheme from '../../../themes/interfaces';
import { HEIGHT, WIDTH } from '../../../constants/general';
import jsImage from '../../../assets/images/js.png';

const ScreenBreakdown = () => {
  const SCREEN_2 = WIDTH * 2;
  const SCREEN_3 = WIDTH * 3;
  const { colors: { background } } = useTheme() as ITheme;

  const animation = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    page: {
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: background,
    },
    image: {
      width: 180,
      height: 180,
      resizeMode: 'contain',
      position: 'absolute',
      top: 90,
      left: 45,
    },
  });

  const getAnimatitedStyles = (startPosition = 0, width = WIDTH, x = 1) => {
    return {
      transform: [{
        translateX: animation.interpolate({
          inputRange: [startPosition, startPosition * x + width / 3],
          outputRange: [0, 60],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [startPosition, startPosition * x + (width / 4), startPosition * x + (width / 2)],
          outputRange: [1, 0.75, 0.5],
          extrapolate: 'clamp',
        }),
      }],
      opacity: animation.interpolate({
        inputRange: [startPosition, startPosition * x + width / 3],
        outputRange: [1, 0.2],
        extrapolate: 'clamp',
      }),
    };
  };

  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: animation } } }],
        { useNativeDriver: false },
      )}
    >
      <View style={styles.page}>
        <Animated.Image
          source={jsImage}
          style={[styles.image, getAnimatitedStyles()]}
        />
      </View>
      <View style={styles.page}>
        <Animated.Image
          source={jsImage}
          style={[styles.image, getAnimatitedStyles(WIDTH, SCREEN_2, 0.75)]}
        />
      </View>
      <View style={styles.page}>
        <Animated.Image
          source={jsImage}
          style={[styles.image, getAnimatitedStyles(SCREEN_2, SCREEN_3, 0.75)]}
        />
      </View>
    </ScrollView>
  );
};

export default ScreenBreakdown;
