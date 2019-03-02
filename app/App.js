import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: "1vw"
    },
});

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>xd</Text>
                <Button title="Click me!">Click me!</Button>
            </View>
        );
    }
}




