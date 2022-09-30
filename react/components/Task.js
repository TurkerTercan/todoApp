import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function Task(props) {
    const id = props.data.id;
    const name = props.data.name;

    const [finished = props.data.finished, setChecked] = useState();
    const [domain, setDomain] = useState("http://10.0.2.2:8000");

    async function finishTask(_data) {
        try {
            console.log("PUT TODOITEMS")
            let return_response = undefined;
            await axios.put(domain + '/api/v1.0/user/update-todo-item/', _data).then(response => {return_response = response});
            return return_response;
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCheck = () => {
        data = {
            "todo": [
                {
                    "ID": id,
                    "NAME": name,
                    "FINISHED": !finished
                }
            ]
        }
        finishTask(data).then(response => { 
            if (response.status === 200) {
                setChecked(!finished);
            }
         });
    }

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={handleCheck}>
                    {finished ? <Icon name='check' size={20} color='yellow'></Icon> : null}
                </TouchableOpacity>
                <Text style={styles.itemNext}>{name}</Text>
            </View>
            
            <TouchableOpacity style={styles.circular} onPress={props.delete}>
                <Icon name='trash' size={20}></Icon>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        alignItems: 'center',
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemNext: {
        maxWidth: '80%',
        
    },
    circular: {
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: 2.5,
        width: 25,
        height: 25,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});