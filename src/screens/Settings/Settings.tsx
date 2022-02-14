import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import CustomSwitch from '../../components/Switch/Switch';
import LanguagesModal from './components/LanguagesModal';
import ITheme from '../../themes/interfaces';
import { RootState } from '../../store/interfaces/redux.interface';
import { Theme } from '../../store/general/interfaces';
import { toggleTheme } from '../../store/general/actions';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { colors: { mainText } } = useTheme() as ITheme;
  const { theme } = useSelector((state: RootState) => state.general, shallowEqual);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const isDarkMode = theme === Theme.dark;

  const styles = StyleSheet.create({
    title: {
      color: mainText,
      fontSize: 30,
      fontWeight: '700',
      textTransform: 'capitalize',
    },
    content: {
      width: '100%',
      marginTop: 30,
    },
    text: {
      color: mainText,
      fontSize: 21,
      textTransform: 'capitalize',
    },
    settingsItemWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 9,
    },
  });

  const toggleDarkMode = () => dispatch(toggleTheme(theme === Theme.dark ? Theme.light : Theme.dark));

  const toggleModal = (isOpen: boolean) => {
    return () => setIsModalOpen(isOpen);
  };

  return (
    <Layout>
      <Text style={styles.title}>{t('settings')}</Text>
      <View style={styles.content}>
        <View style={styles.settingsItemWrapper}>
          <Text style={styles.text}>{t('darkMode')}</Text>
          <CustomSwitch handler={toggleDarkMode} enabled={isDarkMode} />
        </View>
        <View style={styles.settingsItemWrapper}>
          <Text onPress={toggleModal(true)} style={styles.text}>{t('language')}</Text>
          <Text style={styles.text}>{t(i18n.language)}</Text>
        </View>
      </View>
      <LanguagesModal visible={isModalOpen} closeModal={toggleModal(false)} />
    </Layout>
  );
};

export default Settings;
