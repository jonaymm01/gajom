import React, { useState, useEffect, useTransition } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignUp } from '../components/Signup';
import { Login } from '../components/Login';
import { styles } from '../styles/styles';
import { getUser } from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

export function User() {
    const [activeUser, loadActive] = useState(0)

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

    return (
    <View style={styles.container}>
        <View style={styles.text_container}>
            <Text style={styles.title}>{user.name}</Text>
        </View>
    </View>
    );
}