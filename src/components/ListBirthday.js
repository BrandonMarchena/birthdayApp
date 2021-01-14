import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddBirthday from './AddBirthday';
import ActionBar from './ActionBar';

const ListBirthday = () => {

    const [showList, setShowList] = useState(true);

    return (
        <View style={styles.container}>
            {showList ? (
                <>
                    <Text>Lista</Text>
                    <Text>Lista</Text>
                    <Text>Lista</Text>
                    <Text>Lista</Text>
                </>
            ) : (
                <AddBirthday />
            )}
            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    )
}

export default ListBirthday;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    }
});
