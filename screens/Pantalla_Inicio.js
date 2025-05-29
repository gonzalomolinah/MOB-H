import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';

export default function InicioScreen({ navigation }) {
  const { colors } = useTheme();
  const [gastos, setGastos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchGastos = async () => {
      const data = await AsyncStorage.getItem('gastos');
      if (data) setGastos(JSON.parse(data));
    };
    if (isFocused) fetchGastos();
  }, [isFocused]);

  const eliminarGasto = async (id) => {
    const nuevos = gastos.filter(g => g.id !== id);
    await AsyncStorage.setItem('gastos', JSON.stringify(nuevos));
    setGastos(nuevos);
  };

  const filtrarGastos = gastos.filter(g => {
    const coincideTexto = g.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria ? g.categoria === filtroCategoria : true;
    return coincideTexto && coincideCategoria;
  });

  const categorias = [...new Set(gastos.map(g => g.categoria))];
  const dataGrafico = categorias.map((c, i) => ({
    name: c,
    amount: gastos.filter(g => g.categoria === c).reduce((a, b) => a + b.monto, 0),
    color: `hsl(${i * 60}, 70%, 50%)`,
    legendFontColor: colors.text,
    legendFontSize: 12
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Buscar..."
        placeholderTextColor={colors.inputText}
        value={busqueda}
        onChangeText={setBusqueda}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
      />
      <TextInput
        placeholder="Filtrar por categoría..."
        placeholderTextColor={colors.inputText}
        value={filtroCategoria}
        onChangeText={setFiltroCategoria}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
      />

      {dataGrafico.length > 0 && (
        <PieChart
          data={dataGrafico.map(d => ({
            name: d.name,
            population: d.amount,
            color: d.color,
            legendFontColor: d.legendFontColor,
            legendFontSize: d.legendFontSize
          }))}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            color: () => colors.text,
            labelColor: () => colors.text
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      <FlatList
        data={filtrarGastos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity onPress={() => eliminarGasto(item.id)} style={styles.deleteButton}>
                <Text style={{ color: 'white' }}>Eliminar</Text>
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity onPress={() => navigation.navigate('DetalleGasto', { gasto: item })}>
              <View style={[styles.item, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>{item.descripcion}</Text>
                <Text style={{ color: colors.text }}>${item.monto}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('AgregarGasto')}>
        <Text style={styles.botonTexto}>+ Agregar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  boton: { backgroundColor: '#6200ee', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  botonTexto: { color: 'white', fontSize: 16 },
  deleteButton: { backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: 100, height: '100%' }
});
