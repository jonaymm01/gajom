import React, { useState, useEffect, useTransition } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignUp } from '../components/Signup';
import { Login } from '../components/Login';
import { styles } from '../styles/styles';
import { getUser } from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'


export function User() {

    const [user, loadUser] = useState(0)
    
    useEffect(() => {
        AsyncStorage.getItem('active')
        .then(loadUser)
        .catch(e => {})//handle error
    
    }, [])

    let userName = JSON.parse(user).email

    return (
    <View style={styles.container}>
        <View style={styles.text_container}>
            <Text style={styles.title}>{userName}</Text>
        </View>
    </View>
    );
}