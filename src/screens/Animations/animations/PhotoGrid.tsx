import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  View, Image, StyleSheet, ScrollView,
} from 'react-native';
import { PHOTO_GRID_IMAGES_DATA } from '../../../constants/defines';
import { WIDTH } from '../../../constants/general';
import ITheme from '../../../themes/interfaces';

const PhotoGrid = () => {
  const IMAGE_SIZE = (WIDTH / 3) - 5;
  const { colors: { background } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
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
    },
  });

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.grid}>
        {PHOTO_GRID_IMAGES_DATA.map((item) => (
          <Image style={styles.image} source={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default PhotoGrid;
