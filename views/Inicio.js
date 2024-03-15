/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Platform, View} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {List, Headline, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {
  const [clientes, setClientes] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const obtenerClientesApi = async () => {
        try {
          // Obtener Clientes Según la Plataforma
          const URL =
            Platform.OS === 'ios'
              ? 'http://localhost:3000/clientes'
              : 'http://192.168.1.5:3000/clientes';
          try {
            const resultado = await axios.get(URL);
            setClientes(resultado.data);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      };
      obtenerClientesApi();
    }, []),
  );

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? '🗂️ Listado de Clientes' : '😵 No hay Clientes'}
      </Headline>
      <FlatList
        keyExtractor={cliente => cliente.id.toString()}
        data={clientes}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={`Empresa: ${item.empresa}`}
            onPress={() => navigation.navigate('DetallesCliente',{item})}
          />
        )}
      />
      <FAB
        style={globalStyles.fab}
        icon="plus"
        onPress={() => navigation.navigate('NuevoCliente')}
      />
    </View>
  );
};

export default Inicio;
