import React, { FC } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ISwipeCardItem from './interfaces/SwipeCardItem.interface';
import ITheme from '../../../../themes/interfaces';

const SwipeCardItem: FC<ISwipeCardItem> = ({
  imageSrc,
  panHandlers,
  cardStyles,
  imageStyles,
  nextCardStyles,
  isLastItem,
  animatedNoCardStyles,
  animatedYesCardStyles,
}) => {
  const { t } = useTranslation();
  const { colors: { blackWhite, danger, success } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    card: {
      width: 250,
      height: 250,
      position: 'absolute',
      borderRadius: 3,
      borderWidth: 2,
      borderColor: blackWhite,
    },
    image: {
      width: undefined,
      height: undefined,
      flex: 1,
      borderRadius: 2,
      resizeMode: 'cover',
    },
    noCardBlock: {
      borderColor: danger,
      borderWidth: 2,
      position: 'absolute',
      padding: 20,
      borderRadius: 5,
      top: 20,
      right: 20,
      backgroundColor: blackWhite,
    },
    noCardText: {
      fontSize: 16,
      textTransform: 'uppercase',
      color: danger,
    },
    yesCardBlock: {
      borderColor: success,
      borderWidth: 2,
      position: 'absolute',
      padding: 20,
      borderRadius: 5,
      top: 20,
      left: 20,
      backgroundColor: blackWhite,
    },
    yesCardText: {
      fontSize: 16,
      textTransform: 'uppercase',
      color: success,
    },
  });

  return (
    <Animated.View style={[styles.card, cardStyles, nextCardStyles]} {...panHandlers}>
      <Animated.Image
        source={imageSrc}
        style={[styles.image, imageStyles]}
      />
      {isLastItem && (
        <Animated.View style={[styles.noCardBlock, animatedNoCardStyles]}>
          <Text style={styles.noCardText}>{t('no')}</Text>
        </Animated.View>
      )}
      {isLastItem && (
        <Animated.View style={[styles.yesCardBlock, animatedYesCardStyles]}>
          <Text style={styles.yesCardText}>{t('yes')}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default SwipeCardItem;
