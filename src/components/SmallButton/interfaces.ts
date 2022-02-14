import { TextStyle, ViewStyle } from 'react-native';

export default interface ISmallButton {
  onPress: () => void
  title: string
  isDisabled?: boolean
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
}
