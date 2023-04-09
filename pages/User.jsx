import React, { useState, useEffect, useTransition } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import { EditProfile } from '../components/EditProfile'
import { styles } from '../styles/styles';
import { getUser } from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button';
import Input from '../components/Input';
import { useForm, Controller } from 'react-hook-form';


export function User() {
    const [activeUser, loadActive] = useState(0)
    const [modalName, setModalName] = useState(false);
    const [modalEmail, setModalEmail] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            await AsyncStorage.getItem('active')
            .then(loadActive)
            .catch(e => {})
          }
        fetchData()
        .catch(console.error);
    })

    const user = JSON.parse(activeUser)

    const onSubmit = async (value) => {
        console.log('a')
    };

    const openChange = async (flag) => {
        console.log(flag)
        switch (flag) {
            case 'name': 
                setModalName(true)
                break;
            case 'email': 
                setModalEmail(true)
                break;
            case 'password': 
                setModalPassword(true)
                break;
        }
     }

     const changeName = async (value) => {
        console.log('Se ha cambiado el nombre de usuario por: ', value.name)
        const user = await AsyncStorage.mergeItem(activeUser.email, JSON.stringify({name: value.name}))
      };

    return (
    <>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalName}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalName(!modalName);
        }}>
        <View style={modal_styles.centeredView}>
          <View style={modal_styles.modalView}>
            <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40}]}>Escribe el nuevo nombre</Text>
            <Controller
                name="name"
                defaultValue=""
                control={control}
                rules={{
                required: { value: true, message: 'Escribe tu nombre' }
                }}      
                render={({ field: { onChange, value } }) => (
                    <Input
                    error={errors.name}
                    errorText={errors?.name?.message}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder={user.name}
                    />
                )}
            />
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose, {marginTop: 50}]}
              onPress={() => {handleSubmit(changeName); setModalName(!modalName)}}>
              <Text style={modal_styles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEmail}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalEmail(!modalEmail);
        }}>
        <View style={modal_styles.centeredView}>
          <View style={modal_styles.modalView}>
            <Text style={modal_styles.modalText}>Ya existe una cuenta asociada a ese correo electrónico.</Text>
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose]}
              onPress={() => setModalEmail(!modalEmail)}>
              <Text style={modal_styles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalPassword(!modalPassword);
        }}>
        <View style={modal_styles.centeredView}>
          <View style={modal_styles.modalView}>
            <Text style={modal_styles.modalText}>Ya existe una cuenta asociada a ese correo electrónico.</Text>
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose]}
              onPress={() => setModalPassword(!modalPassword)}>
              <Text style={modal_styles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <View style={[styles.container, {alignItems:'center'}]}>
        <View style = {{alignItems: 'flex-start', marginTop: 40}}>
        <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/user_icon.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 20}} />
            <Text style={styles.basic_font_bold}>{user.name}</Text>
        </View>
        <Button onPress={() => openChange('name')} label="Cambiar" />
        <View style={{flexDirection: 'row', marginTop: 30}}>
            <Image source={require('../assets/email_icon.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 20}} />
            <Text style={styles.basic_font_bold}>{user.email}</Text>
        </View>
        <Button onPress={() => openChange('email')} label="Cambiar" />
        <View style={{flexDirection: 'row', marginTop: 30}}>
            <Image source={require('../assets/lock.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 20}} />
            <Text style={styles.basic_font_bold}>{'Contraseña'}</Text>
        </View>
        <Button onPress={() => openChange('password')} label="Cambiar" />
        {/* <EditProfile name={user.name} email={user.email}></EditProfile> */}
        </View>
    </View>
    </>
    );
}

const modal_styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: 'white',
      borderColor: '#763CAD',
      borderWidth: 10,
      borderRadius: 10,
      padding: 40,
      height: 500,
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
      backgroundColor: '#763CAD',
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
      fontWeight: 'bold'
    },
  });