/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Alert, Platform} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {
  const {nombre, telefono, correo, empresa, id} = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '🗑️ Confirma Eliminar?',
      'Un contacto Eliminado no se puede recuperar 😵',
      [
        {text: 'Cancelar 🔙', style: 'cancel'},
        {text: 'Si 🆗', onPress: () => eliminarContacto()},
      ],
    );
  };
  const eliminarContacto = async () => {
    const URL =
      Platform.OS === 'ios'
        ? `http://localhost:3000/clientes/${id}`
        : `http://192.168.1.5:3000/clientes/${id}`;
    try {
      await axios.delete(URL);
      Alert.alert('EXITO!', 'Registro Eliminado', [{text: '🆗'}]);
      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert('Error', `No se pudo eliminar ${error}`, [{text: '🆗'}]);
    }
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>👨‍⚖️ Nombre: {nombre}</Headline>
      <Text style={styles.texto}>
        🔑 Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        📞 Teléfono: <Subheading>{telefono}</Subheading>
      </Text>
      <Text style={styles.texto}>
        📧 Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Button
        style={styles.boton}
        mode="contained"
        onPress={() => mostrarConfirmacion()}>
        <Text style={styles.boton}>🗑️ ELIMINAR 😵</Text>
      </Button>
      <FAB
        style={globalStyles.fab}
        icon="pencil"
        onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item})}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    backgroundColor: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default DetallesCliente;
