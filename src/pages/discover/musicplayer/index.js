import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, findNodeHandle, ActivityIndicator } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import Player from './player'
import Operate from './operate'
import Header from './header'
import Rotate from './rotate'
import RotateList from './rotates'
import { connect } from 'react-redux'
import { changeMusic, play } from "../../../actions/player"

@connect((state) => ({ player: state.player }), { play, changeMusic })
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: null,
            
        }

    }
    componentDidMount() {
        // this.props.getMusicList()
        this.props.play()
        // this.props.changeMusic(0)

    }
    showSlideAnimationDialog = () => {
        this.slideAnimationDialog.show();
    }
    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    render() {
        let { viewRef } = this.state
        let { musicIndex } = this.props.player
        let { musiclist, loaded } = this.props.player
       
        if (!loaded) {
            return <ActivityIndicator size="large" color="#0000ff" style={styles.container} />
        }
        return (
            <View style={styles.container}>
                <BlurView
                    style={styles.absolute}
                    viewRef={viewRef}
                    blurType="dark"
                    blurAmount={25}
                />
                <Image
                    ref={img => {
                        this.backgroundImage = img;
                    }}
                    source={{ uri: musiclist[musicIndex].img }}
                    // source={musiclist[musicIndex].img}
                    style={styles.absolute}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                
                <Header navigation={this.props.navigation} />
                <RotateList />
                <Operate />
                <Player />

            </View>
        );


    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: '100%',
        height: '100%',
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        
    }
});
