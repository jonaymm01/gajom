import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking, ScrollView} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { styles } from '../../styles/styles';


export function FQA() {
    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.text_container}>
            <Text style={styles.title}>¿Qué es GAJOM?</Text>
            <Text style={styles.text}>Gajom es una herramienta orientada a permitir la comunicación instantánea sin el uso de la voz.</Text>
        </View>
        <View style={styles.text_container}>
            <Text style={styles.title}>¿A quién va dirigida?</Text>
            <Text style={styles.text}>A cualquier persona que, de un momento al otro, haya perdido la capacidad de hablar o escuchar. 
            Ejemplos de esto pueden ser pacientes hospitalizados o ancianos con defectos en el habla. </Text>
        </View>
        <View style={styles.text_container}>
            <Text style={styles.title}>¿Qué es la Logopedia?</Text>
            <Text style={styles.text}>La Logopedia es la rama del conocimiento que investiga los trastornos de la comunicación humana.</Text>
        </View>
        <View style={styles.text_container}>
            <Text style={styles.title}>¿Gajom sustituye a un logopeda?</Text>
            <Text style={styles.text}>No, y tampoco es su propósito. Gajom es una solución rápida para situaciones concretas. Si cree que puede necesitar un logopeda, no dude en acudir a uno.</Text>
        </View>
        <View style={styles.text_container}>
            <Text style={styles.title}>¿Qué son los Juegos?</Text>
            <Text style={styles.text}>Los Juegos de Gajom consisten en pequeños retos que cualquier persona puede completar para practicar, de manera divertida, sus destrezas comunicativas</Text>
        </View>
      </View>
    </ScrollView>
    );
}