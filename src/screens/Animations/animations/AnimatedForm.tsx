import React, { useEffect, useRef } from 'react';
import {
  View, Text, Image, Animated, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ITheme from '../../../themes/interfaces';
import bg from '../../../assets/images/animated_form_bg.jpg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedForm = () => {
  const { colors: { white, tomato, black } } = useTheme() as ITheme;
  const { t } = useTranslation();

  const emailAnimation = useRef(new Animated.Value(0)).current;
  const passwordAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    bgImage: {
      width: undefined,
      height: undefined,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
    },
    title: {
      fontSize: 30,
      color: white,
      backgroundColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
      marginBottom: 10,
    },
    form: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${black}25`,
      paddingVertical: 10,
    },
    input: {
      width: 250,
      height: 35,
      paddingHorizontal: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: white,
      color: black,
      backgroundColor: white,
    },
    button: {
      marginTop: 10,
      backgroundColor: tomato,
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: 'center',
      textTransform: 'capitalize',
      color: white,
      fontSize: 16,
    },
  });

  const createAnimationStyle = (animation: Animated.Value) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-5, 0],
    });

    return {
      opacity: animation,
      transform: [
        {
          translateY,
        },
      ],
    };
  };

  const emailStyle = createAnimationStyle(emailAnimation);
  const passwordStyle = createAnimationStyle(passwordAnimation);
  const buttonStyle = createAnimationStyle(buttonAnimation);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(emailAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(passwordAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={bg}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.bgImage]}
      />
      <View style={styles.container} />
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.title}>{t('login')}</Text>
          <AnimatedTextInput
            style={[styles.input, emailStyle]}
            placeholder="Email"
            placeholderTextColor={black}
            keyboardType="email-address"
            editable={false}
          />
          <AnimatedTextInput
            placeholder="Password"
            style={[styles.input, passwordStyle]}
            placeholderTextColor={black}
            secureTextEntry
            editable={false}
          />
          <TouchableOpacity>
            <Animated.View style={[styles.button, buttonStyle]}>
              <Text style={styles.buttonText}>{t('login')}</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.container} />
    </View>

  );
};

export default AnimatedForm;
