import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const cambiarFormulario = () => {
        setIsLogin(!isLogin);
    }

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/img/logo.png')} />
            {isLogin ? (
                <LoginForm cambiarFormulario={cambiarFormulario} />
            ) : (
                <RegisterForm cambiarFormulario={cambiarFormulario} />
            )}
        </View>
    )
}

export default Auth;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50
    }
})