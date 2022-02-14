import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import ITheme from '../../../themes/interfaces';

const MenuList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors: { mainText } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    screen: {
      width: '100%',
      height: '100%',
      padding: 12,
    },
    text: {
      fontSize: 30,
      color: mainText,
      textTransform: 'capitalize',
    },
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.text} onPress={() => navigation.navigate('Animations')}>{t('animations')}</Text>
    </View>
  );
};

export default MenuList;
