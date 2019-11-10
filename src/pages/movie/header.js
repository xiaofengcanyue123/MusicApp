import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Dimensions
} from 'react-native';

import { SearchBar } from 'react-native-elements';

const width = Dimensions.get('window').width

export default class Header extends Component {

    constructor(props) {
        super(...arguments)
        this.state = {

        }
    }

    AlertText = () => {
        alert('功能暂未完善，敬请期待！')
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#d5453c"
                    hidden={false} />
                <View style={styles.view}>
                    <View style={styles.left}>
                        <TouchableHighlight
                            onPress={this.AlertText}
                            underlayColor='#FFFFFF'>
                            <Image
                                style={styles.left_image}
                                source={require('./image/shexiangji.png')}></Image>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.center}>
                        <SearchBar
                            placeholder="Type Here..."
                            placeholderTextColor='#f8a599'
                            onChangeText={this.updateSearch}
                            value={''}
                            containerStyle={{ backgroundColor: '#d5453c', borderTopWidth: 0, borderBottomWidth: 0,
                        width: '100%', height: 45 }}
                            inputContainerStyle={{backgroundColor: '#db665d',height: 30,borderRadius: 30}}  //   #db665d
                            inputStyle={{fontSize: 15}}
                            // leftIconContainerStyle={{borderColor: '#f8a599'}}
                            searchIcon={() => <Image
                                style={{width: 15, height: 15, marginLeft: 6}}
                                source={require('./image/shousuo.png')}></Image>}
                            clearIcon={false}
                        />
                    </View>
                    <View style={styles.right}>
                        <TouchableHighlight
                            // style={{backgroundColor: 'yellow'}}
                            onPress={this.AlertText}
                            underlayColor='#FFFFFF'>
                            <Image
                                style={styles.right_image}
                                source={require('./image/zhuzhuangtu.png')}></Image>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    view: {
        height: 0.10 * width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d5453c',
        // marginTop: 5,
    },

    left: {
        marginLeft: 15,
        marginTop: 10
    },
    left_image: {
        // flex: 1,
        height: 0.075 * width,
        width: 0.075 * width
    },


    center: {
        width: '75%',
        marginTop: 10
    },

    right: {
        marginRight: 15,
        marginTop: 10
    },
    right_image: {
        height: 0.065 * width,
        width: 0.065 * width
    }
})