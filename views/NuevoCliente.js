/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (route.params !== undefined) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;
      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, [route.params]);

  const guardarCliente = async () => {
    let accion = '';
    // Validar el Objeto
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      setAlerta(true);
      return;
    }
    // Generar el Objeto
    const cliente = {nombre, telefono, correo, empresa};

    // Guardar el Objeto Según la Plataforma
    let URL =
      Platform.OS === 'ios'
        ? 'http://localhost:3000/clientes'
        : 'http://192.168.1.5:3000/clientes';

    try {
      if (route.params !== undefined) {
        const id = route.params.cliente.id;
        cliente.id = id;
        URL += `/${id}`;
        await axios.put(`${URL}`, cliente);
        accion = 'Modificó';
      } else {
        await axios.post(`${URL}`, cliente);
        accion = 'Agregó';
      }
      setExito(true);
      setNombre(`Se ${accion} correctamente el Cliente: ${nombre}`);
    } catch (error) {
      console.log(error);
    }
  };

  const guardadoExitosos = () => {
    //Limpiar Form
    setNombre('');
    setTelefono('');
    setCorreo('');
    setEmpresa('');
    setExito(false);
    //Redireccionar
    navigation.navigate('Inicio');
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>🙋🏻‍♂️ Añadir Cliente</Headline>
      <TextInput
        style={styles.input}
        label="👨‍⚖️ Nombre"
        onChangeText={texto => setNombre(texto)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        label="📞 Teléfono"
        onChangeText={texto => setTelefono(texto)}
        value={telefono}
      />
      <TextInput
        style={styles.input}
        label="📧 Correo"
        onChangeText={texto => setCorreo(texto)}
        value={correo}
      />
      <TextInput
        style={styles.input}
        label="🔑 Empresa"
        onChangeText={texto => setEmpresa(texto)}
        value={empresa}
      />

      <Button
        uppercase="true"
        mode="contained"
        onPress={() => guardarCliente()}>
        <Text style={styles.boton}>💾 Guardar</Text>
      </Button>
      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>🚫 Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los Campos Son Obligatorios 💁🏻‍♂️</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>✅ Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={exito} onDismiss={() => guardadoExitosos()}>
          <Dialog.Title>{nombre}😎 </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Puede escribir al correo {correo}📧 Agregado Recientemente!😉
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardadoExitosos()}>✅ Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  boton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default NuevoCliente;
