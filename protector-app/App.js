import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

const colors = {
    bg_green: "rgb(148,199,138)",
    primary: "#4caf50",
    secondary: "#ab47bc"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg_green,
        paddingLeft: Dimensions.get('window').width/10,
        justifyContent: 'center',
        paddingBottom: Dimensions.get('window').width/4
    },
});


function sectotime(t){
    let n = 0;
    if(t < 0){
        n = 1;
        t = -t;
    }
    let hours = Math.floor(t / 3600);
    t %= 3600;
    let minutes = Math.floor(t / 60);
    let seconds = t % 60;
    return (n ? '-' : '') + `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: 5
        }
        this.startTimer();
    }
    startTimer(){
        this.timer = setInterval(()=>{
            this.setState({time: this.state.time-1});
        }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: "bold", fontSize: Dimensions.get('window').height/20, margin: 0, opacity: 0.7}}>You're safe</Text>
                <Text style={{fontSize: Dimensions.get('window').height/15, marginTop: -10, opacity: 0.7}}>{sectotime(this.state.time)}</Text>
                <View style={{width: Dimensions.get('window').width/2, paddingTop: 20}}><Button title="I'm here, reset timer" color={colors.primary} onPress={()=>{}}></Button></View>
            </View>
        );
    }
}
