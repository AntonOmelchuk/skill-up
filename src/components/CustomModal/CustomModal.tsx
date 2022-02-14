import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ITheme from '../../themes/interfaces';
import ICustomModalProps from './interfaces/customModal.interface';

const CustomModal: FC<ICustomModalProps> = ({ visible, children, closeHandler }) => {
  const { colors: { modalOverlay, modalBackground } } = useTheme() as ITheme;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: modalOverlay,
    },
    modal: {
      width: '70%',
      paddingVertical: 30,
      borderRadius: 9,
      backgroundColor: modalBackground,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={closeHandler}>
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
