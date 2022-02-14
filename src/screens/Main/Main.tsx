import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import ITheme from '../../themes/interfaces';
import MenuList from './components/MenuList';

const Main = () => {
  const { colors: { background } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      backgroundColor: background,
    },
  });

  return (
    <Layout style={styles.screen}>
      <MenuList />
    </Layout>
  );
};

export default Main;
