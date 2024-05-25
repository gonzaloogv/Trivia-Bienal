import Quiz from './Trivia';
import * as React from 'react';
import { useState } from 'react';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";


const Separator = () => <View style={styles.separator} />;

export default function HomeScreen () {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.centeredView}>
      <View>
        <View>
          <Text style={styles.title}>
            Bienal 2024
          </Text>
          <Pressable
            onPress={()=> navigation.navigate('Trivia')}>
            <Text style={styles.button}>Jugar</Text>
          </Pressable>
        </View>
        <Separator />
        <View>
          <Pressable
            onPress={() => setIsModalVisible(true)}>
                <Text style={styles.button}>Instrucciones</Text>
          </Pressable>
          <Modal 
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType='slide'
            presentationStyle='pageSheet'
          >
        
            <View style={styles.modalView}>
              <Text style={{fontSize: 24}}>Se le hara una serie de preguntas acerca de la bienal 2024</Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}>
                  <Text style={{color: 'white',
                                textAlign: 'center',
                                backgroundColor: 'midnightblue',
                                borderRadius: 5,
                                padding: 10,
                                elevation: 2,}}>Cerrar</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
    
  )
}
const myjuego = () => {
  return (
    <Quiz/>
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
    fontSize: 32,
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
    fontSize: 24,
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
