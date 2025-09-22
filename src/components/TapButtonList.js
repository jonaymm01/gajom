import React, {ReactNode, useState, useEffect, useContext} from 'react';
import Button from './Button';
import {
  Animated,
  Pressable,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {palette, dp} from '../styles/styles';
import {delTap} from '../_helpers/ProfileContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {ProfileContext} from '../../global';

/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function TapButtonList({...props}) {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  const profile = JSON.parse(activeProfile);

  let row = [];
  let prevOpenedRow;

  const onSwipe = async tapData => {
    deleteTap(tapData);
  };

  const renderLeftActions = (progress, dragX, swipeable) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20,
            transform: [{translateX: trans}],
          },
        ]}>
        <TouchableOpacity onPress={() => swipeable.close()}>
          <Icon name="trash" size={35} color={palette.darkViolet} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  /**
   * Método para redirigir un TAP en formato JSON al creador de Taps
   * @param {JSON} tap
   */
  const goTap = tap => {
    const tapString = JSON.stringify(tap);
    props.navigation.navigate('Tap', {tapString});
  };

  /**
   * Método para borrar un TAP
   * @param {string} profile
   * @param {string} name
   * @param {JSON} options
   */
  const deleteTap = async ({label, options}) => {
    await delTap(profile.name, label, options);
    const modified = await AsyncStorage.getItem(profile.name);
    setProfile(modified);
  };

  let tapButton = tap => (
    <View
      key={tap.text}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          margin: dp(5),
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            goTap(tap);
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: dp(10),
              width: '90%',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: dp(80),
              borderWidth: dp(2),
              borderColor: palette.darkViolet,
              borderRadius: dp(5),
            }}>
            <Text
              style={{
                fontSize: dp(20),
                textAlign: 'left',
                color: palette.darkViolet,
                marginLeft: dp(10),
              }}>
              {tap.text}
            </Text>
            <View style={{height: '100%', width: dp(60)}}>
              {tap.options.map(({color}) => (
                <View style={{backgroundColor: color, flex: 1}} />
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    row[index].close();
  };

  return props.removable ? (
    <FlatList
      data={props.list}
      renderItem={({item, index}) => {
        console.log(item.text);
        return (
          <Swipeable
            key={item.text + Math.random()}
            renderLeftActions={renderLeftActions}
            ref={ref => (row[index] = ref)}
            onSwipeableOpen={direction => {
              if (direction === 'left') {
                onSwipe({label: item.text, options: item.options});
                closeRow(index);
              }
            }}>
            {tapButton(item)}
          </Swipeable>
        );
      }}
    />
  ) : (
    <FlatList data={props.list} renderItem={({item}) => tapButton(item)} />
  );
}

const ButtonListStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: dp(10),
    padding: dp(10),
  },
});
