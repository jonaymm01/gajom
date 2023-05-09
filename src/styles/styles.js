import {StyleSheet} from 'react-native';

export const palette = {
  violet: '#763CAD',
  red: '#AC3C60',
  gray: '#b8b8b8',
};

export const styles = StyleSheet.create({
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
    fontSize: 22,
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
    flex: 1,
    color: '#fff',
    fontSize: 30,
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 100,
  },
  logopedazo_text: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'justify',
    marginTop: -60,
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
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 120,
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

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderColor: '#ed1c24',
    borderWidth: 10,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 80,
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: '#763CAD',
  },
  buttonClose: {
    backgroundColor: '#ed1c24',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 30,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
