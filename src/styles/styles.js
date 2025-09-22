import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

export const palette = {
  violet: '#785ad1',
  red: '#833A58',
  gray: '#919191',
  darkViolet: '#543567',
  white: '#fff',
};

export const tapColors = {
  yellow: '#cfb50d',
  green: '#229824',
  blue: '#0D62CE',
  red: '#ed5050',
  pink: '#fa3ee4',
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const w_width = SCREEN_WIDTH;
export const w_height = SCREEN_HEIGHT;

const scale = SCREEN_HEIGHT / 781;
export const dp = dp => PixelRatio.getFontScale() * dp * scale;

export const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blank_background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  text_container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: dp(22),
    fontWeight: 'bold',
  },
  title_white: {
    fontSize: dp(22),
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: dp(20),
    marginLeft: 10,
    marginRight: 10,
  },
  text_white: {
    fontSize: dp(16),
    textAlign: 'justify',
    padding: 14,
    color: '#fff',
  },
  button: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'white',
  },
  logopedazo_container: {
    flex: 1,
    backgroundColor: '#000',
    fontSize: dp(16),
    width: 30,
  },
  logopedazo_title: {
    color: '#fff',
    fontSize: dp(30),
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logopedazo_text: {
    flex: 2,
    color: '#fff',
    fontSize: dp(18),
    textAlign: 'justify',
    padding: 20,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_small: {
    height: 80,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#763CAD',
    borderRadius: 40,
    borderColor: '#763CAD',
    marginTop: 10,
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: dp(30),
    textAlign: 'center',
  },
  basic_font: {
    fontSize: dp(20),
  },
  basic_font_bold: {
    fontSize: dp(20),
    fontWeight: 'bold',
  },
});

export const formStyles = StyleSheet.create({
  input_container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
