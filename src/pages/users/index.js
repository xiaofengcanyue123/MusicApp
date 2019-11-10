import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import { Header } from 'react-native-elements';
import Indexpage from './userinfo/index'

const tab_user_select = require('../../navigators/assets/user-active.png');
const tab_user = require('../../navigators/assets/user.png');

export default class UsersPage extends Component {
    // 此处设置 Tab 的名称和一些样式，这里的会覆盖掉配置路由文件的样式，下面会讲
    static navigationOptions = {
        headerTitle: '帐号',
        tabBarLabel: '帐号',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
            <Image
                source={focused ? tab_user_select : tab_user}
                style={{ width: 24, height: 24 }}
                resizeMode={'contain'}
            />
        )
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: '帐号', style: { color: '#fff', fontSize: 18 }}}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#d5453c'
                    }}
                />
                <ScrollView>
                    <Indexpage navigation={this.props.navigation}/>
                </ScrollView>
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