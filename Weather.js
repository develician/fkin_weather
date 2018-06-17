import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { axios } from 'axios';


export default class Weather extends Component {
    state = {
    };


    render() {
        const { temp, weatherCode, weatherStatus, weatherCases } = this.props;
        if(!weatherCases) {
            return null;
        } 
        return (
            <LinearGradient colors={weatherCases.bgColor} style={styles.container}>
                <View style={styles.upperView}>
                    {/* <Text>{weatherCases.iconname}</Text> */}
                    <MaterialCommunityIcons style={styles.iconText} name={weatherCases.iconname}/>
                    {/* <Image style={styles.weatherImage} source={{uri: `http://openweathermap.org/img/w/${weatherCode}.png`}} /> */}
                    <Text style={styles.tempText}>
                        {temp} &#8451; 
                    </Text>
                </View>
                <View style={styles.lowerView}>
                    <Text style={styles.title}>
                        {weatherStatus}
                    </Text>
                    <Text style={styles.subTitle}>
                        For more info Look Outside
                    </Text>
                </View>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    upperView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 50
    },
    iconText: {
        fontSize: 60,
        fontWeight: "700",
        color: 'white'
    },
    tempText: {
        fontSize: 40,
        fontWeight: "600",
        marginTop: 20,
        color: 'white'
    },
    lowerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 50
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: 'white'
    },
    subTitle: {
        fontSize: 25,
        fontWeight: "600",
        marginTop: 20,
        color: 'white'
    },
    weatherImage: {
        width: 200,
        height: 200
    }
});
