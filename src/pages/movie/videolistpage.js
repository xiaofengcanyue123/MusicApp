import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    NativeModules,
    DeviceEventEmitter,
    BackHandler
} from 'react-native';

import VideoPlayer from './videoplayer'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const height = Dimensions.get('screen').height - STATUSBAR_HEIGHT

import { connect } from 'react-redux'
import { initVideoList, getMoreVideo } from "../../actions/videolist-action"

@connect((state) => ({ VideoListReducer: state.VideoListReducer }), { getMoreVideo })
export default class VideoListPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // data: this.props.navigation.state.params.data,
            current: this.props.navigation.state.params.initindex,//表示当前item的索引，通过这个实现一个state控制全部的播放器
            currentplayer: this.props.navigation.state.params.initindex,
            flatlistscrollflag: true,
            refreshing: false
        }
    }

    backForAndroid = () => {
        DeviceEventEmitter.emit('ScrollTo', this.state.currentplayer, () => { })
        return false
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backForAndroid)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backForAndroid)
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        DeviceEventEmitter.emit('PullDownRefresh', () => {
            this.setState({ refreshing: false })
        });
    }
    onReachBottom = () => {
        this.props.getMoreVideo()
            .then((res) => {
                if (res.result.length == 0) {
                    // this.setState({ nomoredataflag: true })

                }
            })
            .catch(() => {
                alert('请求失败！')
            })
    }
    renderFlatListFoot = () => {
        return (
            this.props.VideoListReducer.data.length != 0 && <View style={styles.footview}>
                {!this.props.VideoListReducer.nomoredataflag && <ActivityIndicator size="small" color="#acacaf" />}
                <Text style={styles.footview_text}>{this.props.VideoListReducer.nomoredataflag ? '没有更多了' : '加载更多数据'}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="black"
                    hidden={false} />
                <FlatList
                    data={this.props.VideoListReducer.data}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    onEndReached={this.onReachBottom}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={this.renderFlatListFoot}
                    horizontal={false}
                    pagingEnabled={true}
                    scrollEnabled={this.state.flatlistscrollflag}
                    initialScrollIndex={this.props.navigation.state.params.initindex}
                    getItemLayout={(data, index) => {
                        return { length: height, offset: height * index, index }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    viewabilityConfig={{
                        viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                />
            </View>
        )
    }

    _onViewableItemsChanged = ({ viewableItems, changed }) => {
        //这个方法为了让state对应当前呈现在页面上的item的播放器的state
        //也就是只会有一个播放器播放，而不会每个item都播放
        //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
        //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if (viewableItems.length === 1) {
            this.setState({
                current: viewableItems[0].index,
                currentplayer: viewableItems[0].index,
            })
        }
    }

    changePaused = (index) => {
        if (this.state.current != -1) {
            this.setState({ current: -1 })
        } else {
            this.setState({ current: index })
        }
    }

    changeScrollFlag = (flag) => {
        this.setState({ flatlistscrollflag: flag })
    }

    /**  item布局 播放器 等*/
    renderItem = ({ item, index }) => {
        return (
            <View style={{ height: height }}>
                <VideoPlayer changePaused={this.changePaused}
                    changeScrollFlag={this.changeScrollFlag}
                    index={index} current={this.state.current}
                    navigation={this.props.navigation}
                    currentplayer={this.state.currentplayer}
                    videodata={item}></VideoPlayer>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    footview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: height

    },
    footview_text: {
        color: '#acacaf',
        fontSize: 18,
        marginLeft: 15,

    }
});