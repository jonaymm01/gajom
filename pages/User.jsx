import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { t, color } from 'react-native-tailwindcss';
import Input from '../components/Input';
import Button from '../components/Button';

import { useForm, Controller } from 'react-hook-form';

export function User() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);

  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
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
              placeholder="Nombre"
            />
        )}
      />
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{
          required: { value: true, message: 'Escribe tu correo electrónico' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        }}
        render={({ field: { onChange, value } }) => (
            <Input
              error={errors.email}
              errorText={errors?.email?.message}
              onChangeText={(text) => onChange(text)}
              value={value}
              placeholder="Correo electrónico"
            />
        )}
      />
       <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
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
      <Button onPress={handleSubmit(onSubmit)} label="Submit" />
    </View>
  );
}

const styles = {
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, t.bgGray200],
  switch: [t.mB4, t.selfStart, t.flexRow, t.itemsCenter],
  switchText: [t.textBase, t.mR3, t.textGray800]
};