import React, { useState, useRef } from 'react';
import {
  View, Animated, StyleSheet, Image, ScrollView, Pressable,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PHOTO_GRID_IMAGES_DATA } from '../../../constants/defines';
import { HEIGHT, WIDTH } from '../../../constants/general';
import ITheme from '../../../themes/interfaces';

const PhotoGrid = () => {
  const IMAGE_SIZE = (WIDTH / 3) - 5;
  const { colors: { background } } = useTheme() as ITheme;

  const animationValue = useRef(new Animated.Value(0)).current;

  const [activeImage, setActiveImage] = useState<HTMLImageElement | null>();

  const styles = StyleSheet.create({
    screen: {
      flexGrow: 1,
      backgroundColor: background,
    },
    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    image: {
      marginTop: 5,
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      zIndex: 10,
    },
  });

  const onPressHandler = (item: HTMLImageElement) => {
    setActiveImage(item);

    Animated.spring(animationValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setActiveImage(null));
    });
  };

  const widthInterpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [IMAGE_SIZE, WIDTH],
  });

  const heighInterpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [IMAGE_SIZE, HEIGHT],
  });

  const animationStyles = {
    width: widthInterpolation,
    height: heighInterpolation,
  };

  return (
    <>
      <ScrollView style={styles.screen}>
        <View style={styles.grid}>
          {PHOTO_GRID_IMAGES_DATA.map((item) => (
            <Pressable key={item} onPress={() => onPressHandler(item)}>
              <Image style={styles.image} source={item} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {activeImage && (
        <View style={StyleSheet.absoluteFill}>
          <Animated.Image style={animationStyles} source={activeImage} />
        </View>
      )}
    </>
  );
};

export default PhotoGrid;
