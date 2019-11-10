import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableHighlight, FlatList } from 'react-native';
import { connect } from 'react-redux'

@connect((state) => ({ player: state.player }), { })



export default class Operate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,//modal能否看见
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        // let {musiclist}=this.props
        let {musicIndex,musiclist}=this.props.player
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        // alert("Modal has been closed.");
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
                        <View style={styles.header}>
                            <Image style={styles.img_big} source={{ uri: musiclist[musicIndex].img }} />
                            <View>
                                <Text style={styles.song_name}>歌曲:{musiclist[musicIndex].songName}</Text>
                                <Text style={styles.singer}>{musiclist[musicIndex].singer}</Text>
                            </View>
                        </View>

                        <View style={styles.transverse_line} />

                        {/* <FlatList
                            data={musiclist}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity style={styles.musiclist} onPress={() => {
                                    this._stop()
                                    this._playOfIndex(index)
                                }}>

                                    <View style={styles.display}>
                                        {index === this.state.index?<Image style={styles.img} source={require('./img/音量.png')} />:<View />}
                                        {index === this.state.index ? <Text style={styles.song_name_active}>{item.songName}</Text> : <Text style={styles.song_name}>{item.songName}</Text>}
                                        {index === this.state.index ? <Text style={styles.singer_active}> - {item.singer}</Text> : <Text style={styles.singer}> - {item.singer}</Text>}
                                    </View>
                                    <TouchableOpacity onPress={() => { alert('删除') }} >
                                        <Image style={styles.img}
                                            source={require('./img/删除.png')} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            }
                        /> */}
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => { alert('喜欢') }} >
                    <Image style={styles.img} source={require('./icon/桃心.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { alert('喜欢') }} >
                    <Image style={styles.img} source={require('./icon/下载.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { alert('喜欢') }} >
                    <Image style={styles.img} source={require('./icon/鲸云音效.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { alert('喜欢') }} >
                    <Image style={styles.img} source={require('./icon/评论.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true);
                }} >
                    <Image style={styles.img} source={require('./icon/更多.png')} />
                </TouchableOpacity>


            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 100,
        opacity: 1,
    },
    display_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    display_column: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15
    },
    song_name: {
        fontSize: 16,
        marginBottom:5,
    },
    singer: {
        fontSize: 13,
        color: '#707070',
        marginTop:5,
    },
    
    transverse_line_full: {
        height: 1,
        backgroundColor: '#dbdbdb'
    },
    transverse_line: {
        height: 1,
        width: '80%',
        backgroundColor: '#dbdbdb',
        flexDirection: "row",
        justifyContent: "flex-end",
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
    img: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginRight: 5,
    },
    img_big: {
        width: 60,
        height: 60,
        marginLeft: 5,
        marginRight: 5,
    }
});
