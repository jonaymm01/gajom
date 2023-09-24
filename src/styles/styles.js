import {StyleSheet} from 'react-native';

export const palette = {
  violet: '#763CAD',
  red: '#AC3C60',
  gray: '#b8b8b8',
};

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
    fontSize: 26,
    fontWeight: 'bold',
  },
  title_white: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text_white: {
    fontSize: 16,
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
    fontSize: 16,
    width: 30,
  },
  logopedazo_title: {
    color: '#fff',
    fontSize: 30,
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logopedazo_text: {
    flex: 2,
    color: '#fff',
    fontSize: 18,
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
    fontSize: 30,
  },
  basic_font: {
    fontSize: 20,
  },
  basic_font_bold: {
    fontSize: 20,
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