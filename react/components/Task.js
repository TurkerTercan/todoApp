import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Task(props) {
    const [checked = false, setChecked] = useState();

    const handleCheck = () => {
        setChecked(!checked);
    }

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={handleCheck}>
                    {checked ? <Icon name='check' size={20} color='yellow'></Icon> : null}
                </TouchableOpacity>
                <Text style={styles.itemNext}>{props.text}</Text>
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