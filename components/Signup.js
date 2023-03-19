import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { styles as local_styles} from '../styles/styles';

import { t, color } from 'react-native-tailwindcss';
import Input from '../components/Input';
import Button from '../components/Button';

import { useForm, Controller } from 'react-hook-form';

export function SignUp() {
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
      <Text style={[local_styles.title, {lineHeight: 160}]}>Crea tu cuenta</Text>
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
        rules={{
            required: { value: true, message: 'Escribe una contraseña' }
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
      <Button onPress={handleSubmit(onSubmit)} label="Registrarse" />
    </View>
  );
}

const styles = {
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, t.bgWhite],
  switch: [t.mB4, t.selfStart, t.flexRow, t.itemsCenter],
  switchText: [t.textBase, t.mR3, t.textGray800],
};