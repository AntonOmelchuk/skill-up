import { ImageURISource, PanResponderStatic, ViewStyle } from 'react-native';

export default interface ISwipeCardItem {
  imageSrc: ImageURISource
  panHandlers?: PanResponderStatic | object
  cardStyles: ViewStyle | object
  nextCardStyles: ViewStyle | object
  imageStyles: ViewStyle | object
  animatedYesCardStyles: ViewStyle | object
  animatedNoCardStyles: ViewStyle | object
  isLastItem: boolean
}
