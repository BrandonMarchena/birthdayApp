import 'firebase/firestore';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DatePickerModal from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from '../utils/firebase';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

const AddBirthday = () => {

    const [datosFormulario, setDatosFormulario] = useState({});
    const [errorFormulario, setErrorFormulario] = useState({});
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const ocultarDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const eventoConfirmarFecha = (event, selectedDate) => {
        const {type} = event;
        if(type !== 'dismissed'){
            const currentDate = selectedDate || new Date();
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);

            setDatosFormulario({...datosFormulario, fechaCumpleaños: currentDate});
        }
        ocultarDatePicker();
    };

    const crearCumpleaños = () => {
        let excepciones = {};

        if(!datosFormulario.nombre || !datosFormulario.apellido || !datosFormulario.fechaCumpleaños){
            if(!datosFormulario.nombre) excepciones.nombre = true;
            if(!datosFormulario.apellido) excepciones.apellido = true;
            if(!datosFormulario.fechaCumpleaños) excepciones.fechaCumpleaños = true;
        }else{
            const data = datosFormulario;
            data.fechaCumpleaños.setYear(0);
            db.collection('cumpleaños')
            .add(data)
            .then(() =>{
                console.log('OK');
            })
            .catch(err => {
                setErrorFormulario({
                    nombre: true,
                    apellido: true,
                    fechaCumpleaños: true,
                })
            });
        }

        setErrorFormulario(excepciones);
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, errorFormulario.nombre && styles.error ]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={(e) => setDatosFormulario({...datosFormulario, nombre: e.nativeEvent.text})}
                />
                <TextInput
                    style={[styles.input, errorFormulario.apellido && styles.error]}
                    placeholder="Apellido"
                    placeholderTextColor="#969696"
                    onChange={(e) => setDatosFormulario({...datosFormulario, apellido: e.nativeEvent.text})}
                />
                <View style={[styles.input, styles.datePicker, errorFormulario.fechaCumpleaños && styles.error]}>
                    <Text
                        style={{color: datosFormulario.fechaCumpleaños ? '#fff' : '#969696', fontSize: 18}}
                        onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
                    >
                        {datosFormulario.fechaCumpleaños ? moment(datosFormulario.fechaCumpleaños).format("LL") : "Fecha de nacimiento"}                        
                    </Text>
                </View>
                <TouchableOpacity onPress={() =>crearCumpleaños()}>
                    <Text style={styles.addButton}>Crear cumpleaños</Text>
                </TouchableOpacity>
            </View>
            {isDatePickerVisible && (
                <DatePickerModal
                    mode="date"
                    value={new Date()}
                    onChange={eventoConfirmarFecha}
                />
            )}
        </>
    )
}

export default AddBirthday;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    datePicker: {
        justifyContent: 'center',
    },
    addButton: {
        fontSize: 18,
        color: '#fff',
    },
    error: {
        borderColor: '#940c0c',
    }
});
