import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

export default function App() {
    const [id, setId] = useState('');
    const [server, setServer] = useState('');

    const handleInputId = (id) => {
        setId(id)
    };
    const handleInputServer = (server) => {
        setServer(server)
    }

    const handleCheck = async () => {
        if (id === '' || server === '') {
            Alert.alert('Error', 'ID Player atau Server tidak boleh kosong')
            return
        }
        const header = new Headers();
        header.append("Cookie", "PHPSESSID=393251651555a3853b651e7a554cde90");

        const data = new FormData();
        data.append("key", "LY2oa9kjeN1POEiS6K6E3A0FEtAfS3Dvm7U4PjH9VJDkmYW0AW2Ohuv61S32THT9");
        data.append("sign", "0621234f4b5f88f27dad6a71cad25b60");
        data.append("type", "get-nickname");
        data.append("code", "mobile-legends");
        data.append("target", id);
        data.append("additional_target", server);

        const requestOptions = {
            method: "POST",
            headers: header,
            body: data,
            redirect: "follow"
        };

        await fetch("https://vip-reseller.co.id/api/game-feature", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (!result.result) {
                    Alert.alert('Error', 'Pemain tidak ditemukan')
                } else {
                    Alert.alert(
                        'Pemain ditemukan',
                        `ID Pemain: ${id}\nServer: ${server}\nNickname: ${result.data}`
                    )
                }
            })
            .catch((error) => console.error(error))
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mobile Legend - Nickname Checker</Text>
            <TextInput
                style={styles.input}
                placeholder="ID Player"
                onChangeText={handleInputId}
            />
            <TextInput
                style={styles.input}
                placeholder="Server"
                onChangeText={handleInputServer}
            />
            <Button title="Check" onPress={handleCheck} style={styles.button}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#ddd',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        width: 300,
        height: 40,
        borderRadius: 10,
    },
});