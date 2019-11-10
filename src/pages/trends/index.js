import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


const tab_trends_select = require('../../navigators/assets/trends-active.png');
const tab_trends = require('../../navigators/assets/trends.png');

export default class TrendsPage extends Component {
    // 此处设置 Tab 的名称和一些样式，这里的会覆盖掉配置路由文件的样式，下面会讲
    static navigationOptions = {
        headerTitle: '朋友',
        tabBarLabel: '朋友',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
            <Image
              source={focused ? tab_trends_select : tab_trends}
              style={{ width: 24, height: 24 }}
              resizeMode={'contain'}
            />
          )
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
              <Text>测试页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E1E1',
    },
});