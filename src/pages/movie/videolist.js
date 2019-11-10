import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableHighlight,
    DeviceEventEmitter,
    Dimensions
} from 'react-native';
// import fetchData from '../../middleware/fetchData'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.35;

import { connect } from 'react-redux'
import { initVideoList, getMoreVideo } from "../../actions/videolist-action"

@connect((state) => ({ VideoListReducer: state.VideoListReducer }), { initVideoList, getMoreVideo })
export default class VideoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // data: [{ imageUrl: './image/juzhao1.png', text: '我们的爸爸在上海，你永远都不要忘了' },
            // { imageUrl: './image/juzhao2.png', text: '海边想起《三字经》' },
            // { imageUrl: './image/juzhao3.png', text: '云南美食：素食过桥米线' },
            // { imageUrl: './image/juzhao4.png', text: '涨知识：从鸭蛋到咸鸭蛋，发生了什么' }]
            // data: [],
            refreshing: false,
            // nomoredataflag: false
        }
    }

    componentWillMount() {
        // console.log('fdfdfd')
        // alert(JSON.stringify(fetchData(true).then((res) => {return res})))
    }

    componentDidMount() {
        this.movieDetailsListener = DeviceEventEmitter.addListener('ScrollTo', (index, callback) => {
            this.refs.flatlist.scrollToIndex({
                animated: false,   //用来指定是否显示滚动动画   可选
                index: index,      //用来指定要跳转的item的index  必填
                viewOffset: 0,     //用来指定跳转后的item的距离上部的距离   必填
                // viewPosition: 1    //用于判定要跳转的index的item在屏幕上的位置
            })
            callback()
        });
        this.movieDetailsListener1 = DeviceEventEmitter.addListener('PullDownRefresh', (callback) => {
            this.props.initVideoList()
                .then((res) => {
                    callback()
                })
                .catch(() => {
                    alert('请求失败！')
                    callback()
                })
        });

        // fetchData(true).then((res) => { this.setState({ data: res }) })
        this.props.initVideoList()
    }
    componentWillUnmount() {
        this.movieDetailsListener.remove();
        this.movieDetailsListener1.remove();
    }

    AlertText = (index) => {
        const videodata = Object.assign({}, { data: this.state.data, initindex: index })
        DeviceEventEmitter.emit('VideoList', videodata);
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        // fetchData(true).then((resp) => {
        //     // alert('请求成功！')
        //     this.setState({ data: resp, refreshing: false })
        // })
        //     .catch(() => {
        //         alert('请求失败！')
        //         this.setState({ refreshing: false })
        //     })
        this.props.initVideoList()
            .then((res) => { this.setState({ refreshing: false }) })
            .catch(() => {
                alert('请求失败！')
                this.setState({ refreshing: false })
            })
    }

    onReachBottom = () => {
        // fetchData(true).then((resp) => {
        //     // alert('请求成功！')
        //     if (resp.length == 0) {
        //         this.setState({ nomoredataflag: true })
        //     } else {
        //         resp.map((item, index) => {
        //             this.state.data.push(item)
        //         })
        //         this.setState({})
        //     }
        // })
        //     .catch(() => {
        //         alert('请求失败！')
        //     })
        this.props.getMoreVideo()
            .then((res) => {
                // if (res.result.length == 0) {
                //     this.setState({ nomoredataflag: true })
                // }
            })
            .catch(() => {
                alert('请求失败！')
            })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.VideoListReducer.data}
                    renderItem={this.renderItem}
                    horizontal={false}
                    // extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    onEndReached={this.onReachBottom}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={this.renderFlatListFoot}
                    getItemLayout={(data, index) => {
                        return { length: height, offset: height * index, index }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref='flatlist'
                />
            </View>
        )
    }

    renderFlatListFoot = () => {
        return (
            this.props.VideoListReducer.data.length != 0 && <View style={styles.footview}>
                {!this.props.VideoListReducer.nomoredataflag && <ActivityIndicator size="small" color="#acacaf" />}
                <Text style={styles.footview_text}>{this.props.VideoListReducer.nomoredataflag ? '没有更多了' : '加载更多数据'}</Text>
            </View>
        )
    }

    /**  item布局等 */
    renderItem = ({ item, index }) => {
        return (
            <TouchableHighlight
                onPress={() => this.AlertText(index)}
                underlayColor='#FFFFFF'
                style={styles.item}>
                <View style={styles.item_view}>
                    <Image
                        style={styles.item_image}
                        // source={require('./image/juzhao2.png')}
                        source={{ uri: item.imageUrl }}
                    // PlaceholderContent={<ActivityIndicator />}
                    ></Image>
                    <Text
                        numberOfLines={1}
                        // ellipsizeMode={}     //tail：在末尾...省略（默认值） clip：在末尾切割，直接切割字符无省略符  head：在前面...省略  middle：在中间...省略
                        style={styles.item_text}>{item.title}</Text>
                    <Text style={styles.item_backgrand}>02:55</Text>
                </View>
            </TouchableHighlight>

        )
    }

}

const styles = StyleSheet.create({
    item: {
        width: width,
        height: height,
        alignItems: 'center',
    },
    item_view: {
        width: '92%',
        height: '100%'
    },
    item_image: {
        width: '100%',
        height: '82%',
        borderRadius: 5,
    },
    item_text: {
        height: '18%',
        lineHeight: 0.2 * 0.75 * height,
        fontSize: 0.075 * height,
        // fontWeight: 'normal',
        // fontFamily: 'iconfont',
    },
    item_backgrand: {
        position: 'absolute',
        width: 60,
        height: 25,
        lineHeight: 25,
        left: 0.7 * width,
        top: 0.4 * width,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        opacity: 0.7,
        borderRadius: 5,
    },
    footview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        height: 0.06 * width

    },
    footview_text: {
        color: '#acacaf',
        fontSize: 0.026 * width,
        marginLeft: 15,

    }
});