import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

const colors = {
    bg_green: "rgb(148,199,138)",
    bg_red: "rgb(196,124,122)",
    primary: "#4caf50",
    secondary: "#4caf50"
}


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
            time: 5,
            bg: colors.bg_green,
            trusted: true
        }
        this.startTimer();
    }
    startTimer(){
        this.timer = setInterval(()=>{
            this.setState({
                time: this.state.time-1,
                bg: (this.state.time-1 <= 0 ? colors.bg_red : colors.bg_green),
                trusted: true
            });
        }, 1000);

    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.state.bg, paddingLeft: Dimensions.get('window').width/10, justifyContent: 'center', paddingBottom: Dimensions.get('window').width/4}}>
                <Text style={{fontSize: 20, opacity: 0.7, paddingBottom: 10}}>Last seen:</Text>
                <Text style={{fontSize: Dimensions.get('window').height/20, marginTop: -10, opacity: 0.7, fontWeight: "bold"}}>{sectotime(this.state.time)}</Text>
                <Text style={{fontSize: Dimensions.get('window').height/20, marginTop: -10, opacity: 0.7, fontWeight: "bold"}}>{(this.state.trusted ? "Trusted" : "Untrusted") + " location"}</Text>
                <View style={{width: Dimensions.get('window').width/3, paddingTop: 20}}><Button title="Contact" color={colors.secondary} onPress={()=>{}}></Button></View>
            </View>
        );
    }
}
