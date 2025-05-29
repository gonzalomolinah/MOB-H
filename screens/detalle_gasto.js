import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function DetalleGastoScreen({ route }) {
  const { colors } = useTheme();
  const { gasto } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Descripción:</Text>
      <Text style={[styles.text, { color: colors.text }]}>{gasto.descripcion}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Categoría:</Text>
      <Text style={[styles.text, { color: colors.text }]}>{gasto.categoria}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Monto:</Text>
      <Text style={[styles.text, { color: colors.text }]}>${gasto.monto}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Fecha:</Text>
      <Text style={[styles.text, { color: colors.text }]}>{new Date(gasto.fecha).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', fontSize: 16 },
  text: { marginBottom: 10, fontSize: 16 }
});
