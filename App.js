import "firebase/auth";
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  StatusBar,
  YellowBox,
  LogBox
} from 'react-native';
import {decode, encode} from 'base-64';
import Auth from './src/components/Auth';
import firebase from './src/utils/firebase';
import ListBirthday from './src/components/ListBirthday';

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const App = () => {

  const [usuario, setUsuario] = useState(undefined);

  useEffect(() =>{
    firebase.auth().onAuthStateChanged(response => {
      setUsuario(response);
    });
  },[]);  

  if(usuario === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {usuario ? <ListBirthday /> : <Auth />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  }
});

export default App;
