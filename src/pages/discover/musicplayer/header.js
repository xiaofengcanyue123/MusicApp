import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { connect } from 'react-redux'

@connect((state) => ({ player: state.player }), { })

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        
        // let {musiclist}=this.props
        let {musicIndex,musiclist}=this.props.player
        return (
            <View style={styles.container}>
                <View style={styles.header_left}>
                    <TouchableOpacity onPress={() => { 
                        this.props.navigation.goBack() 
                        }}>
                        <Image style={styles.img} source={require('./icon/后退.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { alert('显示歌手歌曲列表') }}>
                        <Text style={styles.song_name}>{musiclist[musicIndex].songName}</Text>
                        <Text style={styles.singer}>{musiclist[musicIndex].singer}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { alert('分享') }}>
                    <Image style={styles.img} source={require('./icon/分享.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    header_left: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    song_name: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    singer: {
        fontSize: 13,
        color: '#707070',
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 5,
        marginRight: 10,
    },
});