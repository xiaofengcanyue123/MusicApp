import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';

import Video from 'react-native-video'

const width = Dimensions.get('window').width
const seekwidth = 0.9 * width

let seekpointmoveposition = 0
let videolength = 0
let videoshouldchangeseekflag = true

export default class VideoPlayer extends Component {

    constructor(props) {
        super(...arguments)
        this.state = {
            dianzan: false,
            showvideo: true,
            seeknum: 0

        }
    }



    AlertText = () => {
        alert('功能暂未完善')
    }
    changeZan = () => {
        this.setState({ dianzan: !this.state.dianzan })
    }
    changePaused = () => {
        // this.setState({ paused: !this.state.paused })
        this.props.changePaused(this.props.index)
    }
    onPressBack = () => {
        DeviceEventEmitter.emit('ScrollTo', this.props.index, () => {
            this.props.navigation.goBack()
        });
    }

    //下面是用户对进度条的控制
    onPressSeekLeft = (event) => {
        videoshouldchangeseekflag = false   //seek脱离Video控制
        if (videolength > 0) {
            this.setState({ seeknum: event.nativeEvent.locationX - 6 }, () => {
                this.refs.video.seek(videolength * this.state.seeknum / (seekwidth - 12))
            })
        } else {
            this.setState({ seeknum: 0 })
        }
    }
    onPressSeekRight = (event) => {
        videoshouldchangeseekflag = false   //seek脱离Video控制
        if (videolength > 0) {
            this.setState({ seeknum: this.state.seeknum + event.nativeEvent.locationX + 6 }, () => {
                this.refs.video.seek(videolength * this.state.seeknum / (seekwidth - 12))
            })
        } else {
            this.setState({ seeknum: 0 })
        }
    }
    onStartPressSeekPoint = (event) => {
        // console.log(event.nativeEvent)
        seekpointmoveposition = event.nativeEvent.pageX
        videoshouldchangeseekflag = false   //seek脱离Video控制
        this.props.changeScrollFlag(false)  //禁止FlatList滑动
    }
    onMoveSeekPoint = (event) => {
        const movedistanse = event.nativeEvent.pageX - seekpointmoveposition;
        if (this.state.seeknum + movedistanse > seekwidth - 12) {
            this.setState({ seeknum: seekwidth - 12 })
        } else if (this.state.seeknum + movedistanse < 0) {
            this.setState({ seeknum: 0 })
        } else {
            this.setState({ seeknum: this.state.seeknum + movedistanse })
            seekpointmoveposition = event.nativeEvent.pageX
        }
    }
    onStopPressSeekPoint = (event) => {
        if (videolength > 0) {
            this.refs.video.seek(videolength * this.state.seeknum / (seekwidth - 12))
        }
        this.props.changeScrollFlag(true)   //启用FlatList滑动
    }

    //下面是Video对进度条的控制
    onVideoProgress = (data) => {
        if (videoshouldchangeseekflag) {
            this.setState({ seeknum: (seekwidth - 12) * data.currentTime / data.seekableDuration })
        }
    }
    onStartPlayVideo = (data) => {
        videolength = data.duration
    }
    onEndPlayVideo = () => {
        // this.refs.video.seek(0)
        // this.setState({ seeknum: 0 })
        this.setState({ showvideo: false }, () => {
            this.setState({ showvideo: true })
        })
    }
    resetvideoshouldchangeseekflag = () => {
        videoshouldchangeseekflag = true     //seek恢复Video控制
    }

    render() {
        return (
            <View style={styles.view}>
                {this.state.showvideo &&
                    ((this.props.index < this.props.currentplayer - 1 ||
                        this.props.index > this.props.currentplayer + 1) ? false : true)
                    && <Video
                        source={{ uri: this.props.videodata.videoUrl }}
                        poster={this.props.videodata.imageUrl}
                        resizeMode='contain'
                        posterResizeMode='contain'
                        // repeat={true}   //无法使用该方式进行视频的重复播放，因为在第一次的后续播放周期中onProgress无法返回正常的进度数据
                        paused={this.props.index == this.props.current ? false : true}
                        style={{ height: '100%' }}
                        progressUpdateInterval={100}
                        onProgress={this.onVideoProgress}
                        onLoad={this.onStartPlayVideo}
                        onEnd={this.onEndPlayVideo}
                        onSeek={this.resetvideoshouldchangeseekflag}
                        ref='video'
                    />}
                {/*                     
                     <Image source={{uri: this.props.videodata.imageUrl}}
                        style={{ height: '30%' }}></Image> */}
                <TouchableOpacity
                    onPress={this.changePaused}
                    activeOpacity={1}
                    style={{ position: 'absolute', height: '100%' }}>
                    <View style={styles.back}>
                        <View style={styles.back_top}>
                            <TouchableOpacity
                                onPress={this.onPressBack}
                                activeOpacity={1}
                                style={{
                                    width: 0.1 * width,
                                    height: 0.1 * width,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Image source={require('./image/zuojiantou.png')}
                                    style={styles.back_top_image}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.back_middle}>
                            {this.props.index == this.props.current ? false : true && <Image source={require('./image/bofang.png')}
                                style={styles.back_middle_image}></Image>}
                        </View>
                        <View style={styles.back_bottom}>
                            <View style={styles.back_bottom_view}>
                                <TouchableOpacity
                                    onPress={this.changeZan}
                                    activeOpacity={1}>
                                    <View style={styles.back_bottom_view_item}>
                                        {this.state.dianzan ? <Image source={require('./image/dianzanred.png')}
                                            style={styles.back_bottom_view_item_topimage}></Image>
                                            : <Image source={require('./image/dianzan.png')}
                                                style={styles.back_bottom_view_item_topimage}></Image>}

                                        <Text style={styles.back_bottom_view_item_text}>1.7万</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.AlertText}
                                    activeOpacity={1}>
                                    <View style={styles.back_bottom_view_item}>
                                        <Image source={require('./image/zhuanfa.png')}
                                            style={styles.back_bottom_view_item_bottomimage}></Image>
                                        <Text style={styles.back_bottom_view_item_text}>分享</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.back_bottom_bottom_view}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.back_bottom_bottom_view_title}>{this.props.videodata.title}</Text>
                                <View style={styles.back_bottom_bottom_view_seek}>
                                    <TouchableOpacity
                                        onPress={this.onPressSeekLeft}
                                        activeOpacity={1}
                                        style={{ height: 20, justifyContent: 'center' }}>
                                        <View style={[styles.back_bottom_bottom_view_seek_left,
                                        { width: this.state.seeknum }]}></View>
                                    </TouchableOpacity>
                                    <View
                                        onStartShouldSetResponder={() => { return true }}
                                        onMoveShouldSetResponder={() => { return true }}
                                        // onStartShouldSetResponderCapture={() => { return true }}
                                        // onMoveShouldSetResponderCapture={() => { return true }}
                                        // onResponderTerminationRequest={() => { return false }}
                                        onResponderGrant={this.onStartPressSeekPoint}
                                        onResponderMove={this.onMoveSeekPoint}
                                        onResponderRelease={this.onStopPressSeekPoint}
                                        style={styles.back_bottom_bottom_view_seek_middle}></View>
                                    <TouchableOpacity
                                        onPress={this.onPressSeekRight}
                                        activeOpacity={1}
                                        style={{ flex: 1, height: 20, justifyContent: 'center' }}>
                                        <View style={styles.back_bottom_bottom_view_seek_right}></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    back: {
        justifyContent: 'space-between'
    },
    back_top: {
        height: '40%',
    },
    back_top_image: {
        width: '50%',
        height: '50%'
    },
    back_middle: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    back_middle_image: {
        width: 80,
        height: 80,
        opacity: 0.7
    },
    back_bottom: {
        height: '40%',
        justifyContent: 'space-between'
    },
    back_bottom_view: {
        height: '80%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    back_bottom_view_item: {
        width: 80,
        height: 100,
        // backgroundColor: 'yellow',
        alignItems: 'center'
    },
    back_bottom_view_item_topimage: {
        width: 35,
        height: 35
    },
    back_bottom_view_item_bottomimage: {
        width: 40,
        height: 40
    },
    back_bottom_view_item_text: {
        fontSize: 15,
        color: 'white',
        marginTop: 10
    },
    back_bottom_bottom_view: {
        height: '20%',
        width: width,
        marginBottom: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    back_bottom_bottom_view_title: {
        fontSize: 0.04 * width,
        color: 'white',
        width: '90%'
    },
    back_bottom_bottom_view_seek: {
        height: 20,
        marginBottom: 10,
        // backgroundColor: 'red',
        width: seekwidth,
        flexDirection: 'row',
        alignItems: 'center'
    },

    back_bottom_bottom_view_seek_left: {
        // width: 0,
        height: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1
    },
    back_bottom_bottom_view_seek_middle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white'
    },
    back_bottom_bottom_view_seek_right: {
        // flex: 1,
        height: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1
    }
});