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
    StatusBar
} from 'react-native';

// const tab_cart_select = require('../../assets/tabr/ticket-active.png');
// const tab_cart = require('../../assets/tabr/ticket.png');

export default class VideoListNew extends Component {


    //  // 此处设置 Tab 的名称和一些样式，这里的会覆盖掉配置路由文件的样式，下面会讲
    //  static navigationOptions = {
    //     headerTitle: '动态',
    //     tabBarLabel: '动态',
    //     tabBarIcon: ({ focused, horizontal, tintColor }) => (
    //         <Image
    //           source={focused ? tab_cart_select : tab_cart}
    //           style={{ width: 30, height: 30 }}
    //           resizeMode={'contain'}
    //         />
    //       )
    // };

    constructor(props) {
        super(...arguments)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Text>新页面</Text>
            </View>
        )
    }

}