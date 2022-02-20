import { ViewStyle } from 'react-native';

export default interface IRoundButton {
  bgColor?: string
  icon?: HTMLImageElement
  extraStyles?: ViewStyle
  title?: string
  onPress?: () => void
}
