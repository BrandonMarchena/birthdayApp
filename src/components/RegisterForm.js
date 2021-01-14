import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

const RegisterForm = (props) => {

    const {cambiarFormulario} = props;
    const [errorFormulario, setErrorFormulario] = useState({});
    const [datosFormulario, setDatosFormulario] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        dateRegister: "",
    });

    const registrarUsuario = () => {
        let excepciones = {};

        if(!datosFormulario.email || !datosFormulario.password || !datosFormulario.repeatPassword){
            if(!datosFormulario.email) excepciones.email = true;
            if(!datosFormulario.password) excepciones.password = true;
            if(!datosFormulario.repeatPassword) excepciones.repeatPassword = true;
        }else if(!validateEmail(datosFormulario.email)){
            excepciones.email = true;
        } else if(datosFormulario.password !== datosFormulario.repeatPassword){
            excepciones.password = true;
            excepciones.repeatPassword = true;
        } else if(datosFormulario.password.length < 6){
            excepciones.password = true;
            excepciones.repeatPassword = true;
        }else{
            firebase
                .auth()
                .createUserWithEmailAndPassword(datosFormulario.email, datosFormulario.password)
                .catch(error =>{
                    setErrorFormulario({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    });

                    console.log('Error Firebase');
                    console.log(error);
                });
        }

        setErrorFormulario(excepciones);
    };

    return (
        <>
            <TextInput 
                style={[styles.input, errorFormulario.email && styles.error]}
                placeholder='Correo Electrónico'
                placeholderTextColor='#969696'
                onChange={e => setDatosFormulario({...datosFormulario, email: e.nativeEvent.text})}
            />

            <TextInput 
                style={[styles.input, errorFormulario.password && styles.error]}
                placeholder='Contraseña'
                secureTextEntry
                placeholderTextColor='#969696'
                onChange={e => setDatosFormulario({...datosFormulario, password: e.nativeEvent.text})}
            />

            <TextInput 
                style={[styles.input, errorFormulario.repeatPassword && styles.error]}
                placeholder='Repetir Contraseña'
                secureTextEntry
                placeholderTextColor='#969696'
                onChange={e => setDatosFormulario({...datosFormulario, repeatPassword: e.nativeEvent.text})}
            />

            <TouchableOpacity onPress={() => registrarUsuario()}>
                <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>

            <View style={styles.footerButton}>
                <TouchableOpacity onPress={() => cambiarFormulario()}>
                    <Text style={styles.btnText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default RegisterForm;

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        height: 40,
        color: '#fff',
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    footerButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    error: {
        borderColor: '#940c0c',
    }
});