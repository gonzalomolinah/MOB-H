import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@react-navigation/native';

export default function AgregarGastoScreen({ navigation }) {
  const { colors } = useTheme();
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const guardarGasto = async () => {
    if (!descripcion || !monto || !categoria) {
      return Alert.alert('Error', 'Completa todos los campos');
    }

    const nuevoGasto = {
      id: uuidv4(),
      descripcion,
      categoria,
      monto: parseFloat(monto),
      fecha: new Date().toISOString()
    };

    const data = await AsyncStorage.getItem('gastos');
    const gastos = data ? JSON.parse(data) : [];
    gastos.push(nuevoGasto);
    await AsyncStorage.setItem('gastos', JSON.stringify(gastos));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Descripción"
        placeholderTextColor={colors.inputText}
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
      />
      <TextInput
        placeholder="Categoría"
        placeholderTextColor={colors.inputText}
        value={categoria}
        onChangeText={setCategoria}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
      />
      <TextInput
        placeholder="Monto"
        placeholderTextColor={colors.inputText}
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
      />
      <Button title="Guardar" onPress={guardarGasto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }
});
