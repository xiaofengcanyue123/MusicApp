import React, { Component } from 'react';
import { DeviceEventEmitter, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableHighlight, FlatList } from 'react-native';
import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'
import { connect } from 'react-redux'
import { play, pause, changeMusic, changeMode } from "../../../actions/player"

@connect((state) => ({ player: state.player }), { play, pause, changeMusic, changeMode })

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whoosh: null,
            seconds: 0, //秒数
            totalMin: '', //总分钟
            totalSec: '', //总分钟秒数
            nowMin: 0, //当前分钟
            nowSec: 0, //当前秒钟
            maximumValue: 0, //滑块最大值
            // playingMode: 1,//当前音乐播放状态 0:顺序播放 1:单曲循环 2:随机播放
            modalVisible: false,//modal能否看见
        }
    }
    componentDidMount() {
        // this.listener = DeviceEventEmitter.addListener("changeMusic", flag => {
        //     if (flag === 1) {
        //         //播放下一首 
        //         this._playNext()
        //     }
        //     else if (flag === -1) {
        //         //播放上一首
        //         this._playPre()
        //     }
        // });
        this.listener = DeviceEventEmitter.addListener("swiperChangeMusic", (index) => {
            console.log('swiperChangeMusic')
            this._stop()
            DeviceEventEmitter.emit("pause")
            this.props.changeMusic(musicIndex)
            this._playOfIndex(index)
        });

        // let { musiclist } = this.props
        let { musicIndex, length } = this.props.player
        if (length > 0) {
            this._playOfIndex(musicIndex)
        }
    }
    componentWillUnmount() {
        this.time && clearTimeout(this.time);
        this._stop()
    }
    //初始化
    _init = (url) => {
        var whoosh = new Sound(url, null, (error) => {
            if (error) {
                console.log('资源加载失败', error);
                return
            }
            let totalTime = whoosh.getDuration()
            totalTime = Math.ceil(totalTime);
            let totalMin = parseInt(totalTime / 60); //总分钟数
            let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
            totalSec = totalSec > 9 ? totalSec : '0' + totalSec
            this.setState({
                whoosh: whoosh,
                totalMin,
                totalSec,
                maximumValue: totalTime,
                nowMin: 0,
                nowSec: 0,
                seconds: 0,
            }, () => {
                this._play()
            })
        })
    }
    _getNowTime = (seconds) => {
        let { nowMin, nowSec, maximumValue } = this.state
        if (seconds >= 60) {
            nowMin = parseInt(seconds / 60); //当前分钟数
            nowSec = seconds - nowMin * 60;
            nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
        } else {
            nowSec = seconds < 10 ? '0' + seconds : seconds;
        }
        if (seconds >= maximumValue) {
            this._playNext()
        }
        else {
            this.setState({
                nowMin,
                nowSec,
                seconds
            })
        }

    }
    //播放模式的更改
    _playMode = () => {
        let { playingMode } = this.props.player
        //当前音乐播放状态 0:顺序播放 1:单曲循环 2:随机播放
        let mode = (playingMode + 1) % 3
        this.props.changeMode(mode)
    }
    //暂停、播放按钮更替
    _palyOrPause = () => {
        let { playing } = this.props.player
        if (playing === true) {

            this._pause()
        } else {

            this._play()
        }
    }
    // 播放
    _play = () => {
        let { whoosh } = this.state
        // console.log('play--whoosh----'+whoosh)
        this.props.play()
        this.time = setInterval(() => {
            whoosh.getCurrentTime(seconds => {
                seconds = Math.ceil(seconds);
                this._getNowTime(seconds)
            })
        }, 1000)
        DeviceEventEmitter.emit("play");
        whoosh.play();
    }
    // 暂停
    _pause = () => {
        let { whoosh } = this.state
        // console.log('pause--whoosh----' + whoosh)    
        this.props.pause()
        clearInterval(this.time);
        DeviceEventEmitter.emit("pause")
        whoosh.pause();
    }
    // 停止
    _stop = () => {
        let { whoosh } = this.state
        // console.log('stop--whoosh----' + whoosh)
        clearInterval(this.time);
        this.setState({
            nowMin: 0,
            nowSec: 0,
            seconds: 0,
        })
        whoosh.stop();
    }
    //下一首
    _playNext = () => {
        this._stop()
        DeviceEventEmitter.emit("pause")
        let { musicIndex, length, playingMode } = this.props.player
        var num = 0
        //循环播放模式
        if (playingMode === 0) {
            // console.log('循环播放下一首')
            num = (musicIndex + 1) % length
        }
        //随机播放模式
        else if (playingMode === 2) {
            // console.log('随机播放下一首')
            num = this._getRndInteger(0, length)
        }
        //单曲循环
        else if (playingMode === 1) {
            // console.log('单曲播放下一首')
            num = musicIndex
        }
        // this._playOfIndex(num)
        this.props.changeMusic(num)
    }
    //返回min-max之间的数
    _getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //上一首
    _playPre = () => {
        this._stop()
        DeviceEventEmitter.emit("pause")
        let { musicIndex, length, playingMode } = this.props.player
        var num = 0
        //循环播放模式
        if (playingMode === 0) {
            // console.log('循环播放下一首')
            num = (musicIndex + length - 1) % length
        }
        //随机播放模式
        else if (playingMode === 2) {
            // console.log('随机播放下一首')
            num = this._getRndInteger(0, length)
        }
        else if (playingMode === 1) {
            // console.log('单曲播放下一首')
            num = musicIndex
        }
        // this._playOfIndex(num)
        this.props.changeMusic(num)
    }
    //播放num序号的歌曲
    _playOfIndex = (num) => {
        // let { musiclist } = this.props
        let { length, musiclist } = this.props.player
        if (length > num && length > 0) {
            console.log(musiclist[num].songName)
            this._init(musiclist[num].url)
            this.props.changeMusic(num)
        }
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        let {
            whoosh,//歌曲
            seconds, //秒数
            totalMin, //总分钟
            totalSec, //总分钟秒数
            nowMin, //当前分钟
            nowSec, //当前秒钟
            maximumValue,  //滑块最大值
        } = this.state
        let { playing, musicIndex, length, playingMode, musiclist } = this.props.player
        // let { musiclist } = this.props
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                    >
                        <View style={styles.sky} />
                    </TouchableHighlight>

                    <View style={styles.dialog}>
                        <View style={styles.musiclist_operate}>
                            <TouchableOpacity onPress={this._playMode} style={styles.display}>
                                <Image style={styles.img}
                                    source={playingMode === 1 ? require('./icon/单曲循环-灰色.png') : (playingMode === 0 ? require('./icon/循环播放-灰色.png') : require('./icon/随机播放-灰色.png'))} />
                                {playingMode === 1 ? <Text>单曲循环</Text> : (playingMode === 0 ? <Text>循环播放</Text> : <Text>随机播放</Text>)}
                                <Text>
                                    ({length})
                                    </Text>
                            </TouchableOpacity>

                            <View style={styles.display}>
                                <TouchableOpacity onPress={() => { alert('收藏全部') }} style={styles.display}>
                                    <Image style={styles.img}
                                        source={require('./icon/收藏全部.png')} />
                                    <Text>收藏全部</Text>
                                </TouchableOpacity>
                                <View style={styles.vertival_line} />
                                <TouchableOpacity onPress={() => { alert('清空列表') }} >
                                    <Image style={styles.img}
                                        source={require('./icon/垃圾桶.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.transverse_line} />



                        <FlatList
                            data={musiclist}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity style={styles.musiclist} onPress={() => {
                                    this._stop()
                                    this._playOfIndex(index)
                                }}>

                                    <View style={styles.display}>
                                        {index === musicIndex ? <Image style={styles.img} source={require('./icon/音量.png')} /> : <View />}
                                        {index === musicIndex ? <Text style={styles.song_name_active}>{item.songName}</Text> : <Text style={styles.song_name}>{item.songName}</Text>}
                                        {index === musicIndex ? <Text style={styles.singer_active}> - {item.singer}</Text> : <Text style={styles.singer}> - {item.singer}</Text>}


                                    </View>
                                    <TouchableOpacity onPress={() => { alert('删除') }} >
                                        <Image style={styles.img}
                                            source={require('./icon/删除.png')} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </Modal>


                <View style={styles.play_view}>
                    <Text style={styles.time} >{nowMin}:{nowSec}</Text>
                    <View style={styles.slider_view}>
                        <Slider
                            maximumTrackTintColor={'#FFFFFF'} //右侧轨道的颜色
                            minimumTrackTintColor={'#FFFFFF'} //左侧轨道的颜色
                            maximumValue={maximumValue} //滑块最大值
                            minimumValue={0} //滑块最小值
                            value={seconds}
                            onSlidingComplete={(value) => { //用户完成更改值时调用的回调（例如，当滑块被释放时）
                                value = parseInt(value);
                                this._getNowTime(value)
                                // 设置播放时间
                                whoosh.setCurrentTime(value);
                            }}
                            trackStyle={styles.slider}
                        />


                    </View>

                    <Text style={styles.time} >{totalMin}:{totalSec}</Text>
                </View>
                <View style={styles.operate_list}>
                    <TouchableOpacity onPress={this._playMode} >
                        <Image style={styles.img}
                            source={playingMode === 1 ? require('./icon/单曲循环.png') : (playingMode === 0 ? require('./icon/循环播放.png') : require('./icon/随机播放.png'))} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._playPre} >
                        <Image style={styles.img} source={require('./icon/上一首.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._palyOrPause} >
                        <Image style={styles.img_play}
                            source={playing ? require('./icon/播放.png') : require('./icon/暂停.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._playNext} >
                        <Image style={styles.img} source={require('./icon/下一首.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.setModalVisible(true);
                    }} >
                        <Image style={styles.img} source={require('./icon/播放列表.png')} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        position: "absolute",
        bottom: 0,
        opacity: 1,
    },
    display: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    musiclist_operate: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        marginLeft: 15,
        marginRight: 15
    },
    musiclist: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15
    },
    song_name: {
        fontSize: 16,
    },
    song_name_active: {
        fontSize: 16,
        color: '#d5453c'
    },
    singer: {
        fontSize: 13,
        color: '#707070'
    },
    singer_active: {
        fontSize: 13,
        color: '#d5453c'
    },
    transverse_line: {
        height: 1,
        backgroundColor: '#dbdbdb'
    },
    vertival_line: {
        width: 1,
        height: 25,
        backgroundColor: '#dbdbdb',
        marginRight: 15,
        marginLeft: 15,
    },
    sky: {
        height: '100%',
        backgroundColor: '#C0C0C0',
        opacity: 0.3,
    },
    dialog: {
        height: '60%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: 'absolute',
        bottom: 0,
    },
    time: {
        color: 'white'
    },
    slider_view: {
        width: '80%'
    },
    slider: {
        height: 1,
    },
    play_view: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    operate_list: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    img_play: {
        width: 40,
        height: 40
    },
    img: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginRight: 5,
    }
});
