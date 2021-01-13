import "firebase/auth";
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import Auth from './src/components/Auth';
import firebase from './src/utils/firebase';
import ListBirthday from './src/components/ListBirthday';

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
