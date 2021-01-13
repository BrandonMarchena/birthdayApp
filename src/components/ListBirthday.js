import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionBar from './ActionBar';

const ListBirthday = () => {
    return (
        <View style={styles.container}>
            <Text>Lista</Text>
            <ActionBar />
        </View>
    )
}

export default ListBirthday;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    }
})
