import * as React from 'react';
import { useState } from 'react';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import Trivia from './screens/Trivia';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Separator = () => <View style={styles.separator} />;
const Stack = createNativeStackNavigator();

export default function App () {

  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Home}/>
        <Stack.Screen name="Trivia" component={Trivia}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  centeredViewModalButton: {

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    elevation: 50,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

