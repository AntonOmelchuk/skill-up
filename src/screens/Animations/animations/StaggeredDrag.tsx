import React, { useRef } from 'react';
import {
  View, StyleSheet, Animated, PanResponder,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import ITheme from '../../../themes/interfaces';

const StaggeredDrag = () => {
  const { colors: { background, blackWhite } } = useTheme() as ITheme;

  const HEADS = [
    { id: 0, animation: new Animated.ValueXY() },
    { id: 1, animation: new Animated.ValueXY() },
    { id: 2, animation: new Animated.ValueXY() },
    { id: 3, animation: new Animated.ValueXY() },
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        HEADS.forEach(({ animation }) => {
          animation.extractOffset();
          animation.setValue({ x: 0, y: 0 });
        });
      },
      onPanResponderMove: (e, { dx, dy }) => {
        HEADS[0].animation.setValue({
          x: dx,
          y: dy,
        });

        HEADS.slice(1).forEach(({ animation }, idx) => {
          return Animated.sequence([
            Animated.delay(idx * 10),
            Animated.spring(animation, {
              toValue: { x: dx, y: dy },
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
    },

    circle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: blackWhite,
      position: 'absolute',
    },
  });
  return (
    <View style={styles.screen}>
      {[...HEADS].reverse().map((item, idx, items) => {
        const pan = idx === items.length - 1 ? panResponder.panHandlers : {};

        return (
          <Animated.View
            {...pan}
            key={item.id}
            style={[styles.circle, { transform: item.animation.getTranslateTransform() }]}
          />
        );
      })}
    </View>
  );
};

export default StaggeredDrag;
