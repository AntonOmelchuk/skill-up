import React, { useState, useRef, useCallback } from 'react';
import {
  View, StyleSheet, PanResponder, Animated,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SmallButton from '../../../components/SmallButton/SmallButton';
import ITheme from '../../../themes/interfaces';
import { clamp } from '../../../utils/helpers';
import { CARDS_IMAGES } from '../../../constants/defines';
import SwipeCardItem from './components/SwipeCardItem';

const SwipeCards = () => {
  const SWIPE_THRESHOLD = 120;

  const { t } = useTranslation();
  const {
    colors: { background, success, danger },
  } = useTheme() as ITheme;
  const [cards, setCards] = useState(CARDS_IMAGES);

  const animation = useRef(new Animated.ValueXY()).current;
  const animatinOpacity = useRef(new Animated.Value(1)).current;
  const animationNextCard = useRef(new Animated.Value(0.9)).current;

  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(animatinOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.spring(animationNextCard, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setCards((items) => items.slice(1));
      animationNextCard.setValue(0.9);
      animatinOpacity.setValue(1);
      animation.setValue({ x: 0, y: 0 });
    });
  };

  const onPressYesButtonHandler = useCallback(() => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: false,
    }).start(() => transitionNext());
  }, []);

  const onPressNoButtonHandler = useCallback(() => {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: false,
    }).start(() => transitionNext());
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: animation.x,
          dy: animation.y,
        },
      ]),
      onPanResponderRelease: (_, { dx, vx, vy }) => {
        let velocity = clamp(vx, 3, 5);

        if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
            useNativeDriver: false,
          }).start(() => transitionNext());
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: background,
      marginTop: 90,
      paddingBottom: 45,
    },
    buttonsWrapper: {
      width: '100%',
      marginTop: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonYes: {
      color: success,
    },
    buttonNo: {
      color: danger,
    },
  });

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const opacity = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const animatedCardStyles = {
    opacity: animatinOpacity,
    transform: [
      {
        rotate,
      },
      ...animation.getTranslateTransform(),
    ],
  };

  const animatedImageStyles = {
    opacity,
  };

  const yesCardOpacity = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
  });

  const yesCardScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const animatedYesCardStyles = {
    transform: [
      { scale: yesCardScale },
      { rotate: '-30deg' },
    ],
    opacity: yesCardOpacity,
  };

  const noCardOpacity = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
  });

  const noCardScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedNoCardStyles = {
    transform: [
      { scale: noCardScale },
      { rotate: '30deg' },
    ],
    opacity: noCardOpacity,
  };

  return (
    <View style={styles.screen}>
      {cards.slice(0, 2).reverse().map(({ id, src }, idx, items) => {
        const isLastItem = idx === items.length - 1;
        const isSecondToLast = idx === items.length - 2;

        return (
          <SwipeCardItem
            key={id}
            imageSrc={src}
            panHandlers={isLastItem ? panResponder.panHandlers : {}}
            cardStyles={isLastItem ? animatedCardStyles : {}}
            imageStyles={isLastItem ? animatedImageStyles : {}}
            nextCardStyles={isSecondToLast ? { transform: [{ scale: animationNextCard }] } : {}}
            isLastItem={isLastItem}
            animatedYesCardStyles={animatedYesCardStyles}
            animatedNoCardStyles={animatedNoCardStyles}
          />
        );
      })}
      <View style={styles.buttonsWrapper}>
        <SmallButton
          onPress={onPressNoButtonHandler}
          title={t('no')}
          titleStyle={styles.buttonNo}
          isDisabled={!cards.length}
        />
        <SmallButton
          onPress={onPressYesButtonHandler}
          title={t('yes')}
          titleStyle={styles.buttonYes}
          isDisabled={!cards.length}
        />
      </View>
    </View>
  );
};

export default SwipeCards;
