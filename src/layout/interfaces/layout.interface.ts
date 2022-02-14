import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { BarStyle } from '../../constants/defines';

export default interface ILayout {
  children: ReactNode
  style?: ViewStyle
  bottomSafeArea?: boolean
  topSafeArea?: boolean
  withLoader?: boolean
  barStyle?: BarStyle
}
