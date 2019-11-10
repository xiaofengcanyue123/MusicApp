import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Avatar, Divider } from 'react-native-elements';

export default class BodyComponent extends Component {

    render() {
        return (
            < View style={styles.container} >
                <TouchableOpacity onPress={() => { alert('我的消息') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/message.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>我的消息</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View style={styles.fline}>
                </View>

                <TouchableOpacity onPress={() => { alert('会员中心') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/huiyuan.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>会员中心</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>
                
                <View>
                <Divider/>
                </View> 

                <TouchableOpacity onPress={() => { alert('商城') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/shangc.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>商城</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View>
                <Divider/>
                </View> 

                <TouchableOpacity onPress={() => { alert('在线听歌免流量') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/tingg.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>在线听歌免流量</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View style={styles.fline}>
                </View>

                <TouchableOpacity onPress={() => { alert('设置') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/shez.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>设置</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View>
                <Divider/>
                </View> 

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Scan',{nav:this.props.navigation})}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/saoys.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>扫一扫</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View>
                <Divider  />
                </View>

                <TouchableOpacity onPress={() => { alert('定时') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/dingshi.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>定时</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View>
                <Divider  />
                </View>

                <TouchableOpacity onPress={() => { alert('优惠券') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/youh2.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>优惠券</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>


                <View style={styles.fline}>
                </View>

                <TouchableOpacity onPress={() => { alert('分享') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/fenxiang1.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>分享</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>

                <View>
                <Divider  />
                </View>

                <TouchableOpacity onPress={() => { alert('关于') }}>
                    <View style={styles.subtitleView}>
                        <Image source={require('../asserts/guanyu.png')} style={styles.ratingImage} />
                        <Text style={styles.ratingText}>关于</Text>
                        <Image source={require('../asserts/right.png')} style={styles.rightImage} />
                    </View>
                </TouchableOpacity>


                <View style={styles.fline}>
                </View>
                <TouchableOpacity onPress={() => { alert('退出登录') }}>
                    <View style={styles.fView}>
                        <Text style={styles.tText}>退出登录</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.fline2}>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 15,
        backgroundColor: '#FFFFFF',
        height: 50,
        
    },
    ratingImage: {
        height: 20,
        width: 20
    },
    ratingText: {
        paddingLeft: 10,
        fontSize: 14,
        color: 'grey'
    },
    rightImage: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    fline: {
        marginTop: 10,
    },
   
    fline2: {
        padding: 20,
    },
    fView: {
        paddingLeft: 10,
        paddingTop: 15,
        backgroundColor: '#FFFFFF',
        height: 50,
    },
    tText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'red'
    },
});