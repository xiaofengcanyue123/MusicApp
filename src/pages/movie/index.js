import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';

import Header from './header'
import Tab from './tab'

const tab_cart_select = require('../../navigators/assets/movie-active.png');
const tab_cart = require('../../navigators/assets/movie.png');

export default class Index extends Component {

    // 此处设置 Tab 的名称和一些样式，这里的会覆盖掉配置路由文件的样式，下面会讲
    static navigationOptions = {
        headerTitle: '视频',
        tabBarLabel: '视频',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
            <Image
              source={focused ? tab_cart_select : tab_cart}
              style={{ width: 30, height: 30 }}
              resizeMode={'contain'}
            />
          )
    };

    constructor(props) {
        super(...arguments)
        this.state = {

        }
    }


    componentDidMount() {
        this.movieDetailsListener = DeviceEventEmitter.addListener('VideoList', (videodata) => {
            // alert(JSON.stringify(videodata))
            this.props.navigation.navigate('VideoList',videodata)
        });
    }
    componentWillUnmount() {
        this.movieDetailsListener.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="red"
                    hidden={false} />
                <Header></Header>
                <View style={{ flex: 1 }}>
                    <Tab />
                </View>
            </View>
        )
    }

}