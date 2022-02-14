import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';
import CustomModal from '../../../components/CustomModal/CustomModal';
import ILanguagesModal from './interfaces/languagesModal.interface';
import ITheme from '../../../themes/interfaces';

const LanguagesModal: FC<ILanguagesModal> = ({ visible, closeModal }) => {
  const { t, i18n: { language, languages, changeLanguage } } = useTranslation();
  const { colors: { mainText } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: mainText,
      fontSize: 21,
      fontWeight: '700',
      textTransform: 'capitalize',
      lineHeight: 30,
      paddingVertical: 12,
    },
  });

  const setLanguage = (lang: string) => {
    return () => changeLanguage(lang)
      .then(() => AsyncStorage.setItem('language', lang))
      .then(closeModal)
      .catch((error) => console.log('ERROR -> LanguagesModal, setLanguage: ', error));
  };

  return (
    <CustomModal visible={visible} closeHandler={closeModal}>
      <>
        {languages
          .filter((currentLang) => currentLang !== language)
          .map((lang) => <Text key={lang} onPress={setLanguage(lang)} style={styles.text}>{t(lang)}</Text>)}
      </>
    </CustomModal>
  );
};

export default LanguagesModal;
