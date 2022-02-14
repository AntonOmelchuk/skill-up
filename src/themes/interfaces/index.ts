interface IColors {
  blackWhite: string
  background: string
  mainText: string
  screenLabel: string
  tabBarBackground: string
  tabBarLabelColor: string
  tabBarActiveLabel: string
  primary: string
  card: string
  text: string
  border: string
  notification: string
  loaderColor: string
  loaderBackground: string
  switchTrackColor: string
  switchThumbColor: string
  modalBackground: string
  modalOverlay: string
  danger: string
  success: string
  white: string
  black: string
  tomato: string
}

export default interface ITheme {
  dark: boolean
  colors: IColors
}
