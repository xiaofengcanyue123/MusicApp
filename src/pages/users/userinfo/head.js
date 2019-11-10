import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Avatar, Divider } from 'react-native-elements';
import { connect } from 'react-redux'
import {getuser} from "../../../actions/user-action"

@connect((state) => ({index: state.index}), {getuser})
class HeadComponent extends Component {

    componentDidMount() {
        this.props.getuser()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titles}>
                    <View style={styles.ph}>
                        <TouchableOpacity onPress={() => { alert('个人资料') }}>
                            <Avatar
                                rounded
                                source={{
                                    uri: this.props.index.imgurl,//'http://p1.music.126.net/gnhpmNK5-qTjI115a7vbsw==/18629025511407533.jpg?param=180y180',
                                }}
                                size="large"

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.id}>
                        <TouchableOpacity onPress={() => { alert('个人资料') }}>
                            <Text style={{ fontSize: 17 }}>{this.props.index.username}</Text>
                            <Image
                                // style={{ width: 70, height: 30 }}
                                source={require('../asserts/level.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sign}>
                        <TouchableOpacity onPress={() => { alert('签到') }}>
                            <View style={styles.signbk} >
                                <View style={styles.signbk1}>
                                    <Image
                                        // style={{ width: 20, height: 20 }}
                                        source={require('../asserts/jinbi.png')}
                                    />
                                </View>
                                <View style={styles.signbk2}>

                                    <Text style={{ fontSize: 14, color: '#d5453c' }} >签到</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lines}>
                    <Divider style={{ height: 1, backgroundColor: '#E1E1E1' }} />
                </View>

                <View style={styles.footer}>
                    <View style={styles.footer1}>
                        <TouchableOpacity onPress={() => { alert('动态') }}>
                            <Text style={{ fontSize: 16, color: 'grey' }} >动态</Text>
                            <Text style={{ marginLeft: 12 }}>2</Text>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <Image  style={{  height: 35 }}
                            source={require('../asserts/shux2.png')}
                        />
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { alert('关注') }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>关注</Text>
                            <Text style={{ marginLeft: 12 }}>5</Text>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <Image style={{  height: 35 }}
                            source={require('../asserts/shux2.png')}
                        />
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { alert('粉丝') }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>粉丝</Text>
                            <Text style={{ marginLeft: 12 }}>1</Text>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <Image style={{  height: 35 }}
                            source={require('../asserts/shux2.png')}
                        />
                    </View>

                    <View style={styles.footer7}>
                        <TouchableOpacity onPress={() => { alert('我的资料') }}>
                            <View style={styles.footer8}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../asserts/bianj.png')}
                                />
                            </View>
                            <Text style={{ fontSize: 12, color: 'grey' }}>我的资料</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titles: {
        flexDirection: 'row',
    },
    ph: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    id: {
        marginTop: 25,
        marginLeft: 15
    },
    sign: {
        marginTop: 35,
        marginLeft: 'auto',
        marginRight: 10,
    },
    signbk:
    {
        alignItems: 'center',
        width: 75,
        height: 28,
        borderColor: '#d5453c',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        flexDirection: 'row',
    },
    signbk1:
    {
        marginLeft: 8,
    },
    signbk2:
    {
        marginLeft: 5,
    },
    lines:
    {
        marginTop: 8,
        marginBottom: 8,
    },
    footer:
    {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    footer1:
    {
        marginLeft: 30,
    },
    footer7:
    {
        marginRight: 35,
    },
    footer8:
    {
        marginLeft: 18,
    }
});

export default  HeadComponent