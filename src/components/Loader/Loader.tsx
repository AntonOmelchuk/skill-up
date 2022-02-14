import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  ActivityIndicator, View, Modal, StyleSheet,
} from 'react-native';
import ITheme from '../../themes/interfaces';
import ILoader from './interfaces/loader.interface';
import { LOADER_SIZE } from '../../constants/general';

const Loader: FC<ILoader> = ({ color }) => {
  const { colors: { loaderColor, loaderBackground } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    modal: {
      zIndex: 1000,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: `${loaderBackground}30`,
      zIndex: 1000,
    },
  });

  return (
    <Modal
      animationType="none"
      transparent
      visible
      onRequestClose={() => {}}
      style={styles.modal}
    >
      <View style={styles.content}>
        <ActivityIndicator size={LOADER_SIZE} color={color || loaderColor} />
      </View>
    </Modal>
  );
};

export default Loader;
