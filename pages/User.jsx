import React, { useState, useEffect, useTransition, useRef } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable, ScrollView, RefreshControl } from 'react-native';
import { EditProfile } from '../components/EditProfile'
import { styles } from '../styles/styles';
import { getUser, setActive } from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button';
import Input from '../components/Input';
import { useForm, Controller } from 'react-hook-form';



export function User({navigation}) {
    const [activeUser, loadActive] = useState(0)
    const [modalName, setModalName] = useState(false);
    const [modalEmail, setModalEmail] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [shouldRefresh, setRefresh] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm();
    
    function refreshData() {
      setRefresh(!shouldRefresh);
    }

    useEffect(() => {
        const fetchData = async () => {
            await AsyncStorage.getItem('active')
            .then(loadActive)
            .catch(e => {})
          }
        fetchData()
        .catch(console.error);
    }, [shouldRefresh])

    const user = JSON.parse(activeUser)

    const openChange = async (flag) => {
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
      let active = JSON.parse(activeUser)
      console.log('Se ha cambiado el nombre de', active.email, ' por: ', value.name)
      await AsyncStorage.mergeItem(active.email, JSON.stringify({name: value.name}))
      const modified = await AsyncStorage.getItem(active.email)
      await setActive(JSON.parse(modified));
      console.log(modified)
      refreshData();
      };

    const changePassword = async (value) => {
      let active = JSON.parse(activeUser)
      await AsyncStorage.mergeItem(active.email, JSON.stringify({password: value.password}))
      const modified = await AsyncStorage.getItem(active.email)
      await setActive(JSON.parse(modified));
      console.log('Se ha cambiado la contraseña de', active.password, ' por: ', value.password)
      console.log(modified)
      refreshData();
      };
    return (
    <ScrollView style={{backgroundColor: '#fff'}}>

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
            <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40, color: '#763CAD'}]}>Indica un nuevo nombre</Text>
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
              onPress={() => {
                handleSubmit(changeName)();
                setModalName(!modalName);
                }}
              >
              <Text style={modal_styles.textStyle}>Aplicar</Text>
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
            <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40, color: '#763CAD'}]}>Indica una nueva contraseña</Text>
            <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                required: { value: true, message: 'Escribe tu contraseña' }
                }}      
                render={({ field: { onChange, value } }) => (
                    <Input
                    error={errors.password}
                    errorText={errors?.password?.message}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    secureTextEntry
                    enablesReturnKeyAutomatically
                    />
                )}
            />
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose, {marginTop: 50}]}
              onPress={() => {
                handleSubmit(changePassword)();
                setModalPassword(!modalPassword);
                }}
              >
              <Text style={modal_styles.textStyle}>Aplicar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <View style={[styles.container, {alignItems:'center'}]}>
        <View style = {{alignItems: 'flex-start', marginTop: 40, alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/email_icon.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 10}} />
            <Text style={styles.basic_font_bold}>{user.email}</Text>
        </View> 
        <View style={{flexDirection: 'row', marginTop: 40}}>
            <Image source={require('../assets/user_icon.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 5}} />
            <Text style={styles.basic_font_bold}>{user.name}</Text>
        </View>
          <Button color='purple' onPress={() => openChange('name')} label="Cambiar" />
       <View style={{flexDirection: 'row', marginTop: 30}}>
            <Image source={require('../assets/lock.png')} resizeMode='contain' style={{flex:1, maxHeight:30, maxWidth: 30, marginRight: 5}} />
            <Text style={styles.basic_font_bold}>{'Contraseña'}</Text>
        </View>
          <Button color='purple' onPress={() => openChange('password')} label="Cambiar" />      
        <View style={{marginTop: 20}}>
          <Button color='red' onPress={() => navigation.navigate("Login")} label="Cerrar sesión" />
        </View>
        <View style={{marginTop: 10}}>
          <Button color='gray' onPress={() => navigation.navigate("Login")} label="Eliminar perfil" />
        </View>
        </View>
    </View>
    </ScrollView>
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