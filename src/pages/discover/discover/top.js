import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Locations} from './location'

let longitude='',latitude='',position=''

export default class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {
          search: '',
        };
      }

      componentDidMount () {
        this.positionDetailsListener = DeviceEventEmitter.addListener('positiondetail', (longitude1,latitude1,position1)=>{
        //   console.log("detail "+longitude+latitude+position)
          longitude=longitude1;latitude=latitude1;position=position1;
        });
        Locations();
      }

      componentWillUnmount () {
        this.positionDetailsListener.remove();
      }
    
      updateSearch = search => {
        this.setState({ search: search });
      };

    render() {
        let { search } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{alert('经度: '+longitude+'\n纬度: '+latitude+'\n位置名称: '+position)}}>
                    <Image style={styles.lfimg} source={require('./image/location.png')}></Image>
                </TouchableOpacity>
                <View style={styles.search}>
                    <SearchBar
                        lightTheme
                        placeholder="大家都在搜 李宗盛" 
                        placeholderTextColor={'#ECA8A9'}
                        onChangeText={this.updateSearch}
                        value={search}
                        round={true}
                        searchIcon={()=><Image style={styles.pic} source={require('./image/search.png')} />}
                        clearIcon={false}
                        containerStyle={styles.elesearch}
                        inputContainerStyle={styles.insearch}
                        inputStyle={styles.input}
                    />
                </View>
                <TouchableOpacity onPress={()=>{alert('点击了')}}>
                    <Image style={styles.rgimg} source={require('./image/vertical.png')}></Image>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 52,
        backgroundColor: '#d5453c'
    },
    search: {
        width: '80%',
    },
    pic: {
        height: 18,
        width: 18,
    },
    lfimg: {
        height: 30,
        width: 30,
        marginLeft: 4
    },
    rgimg: {
        height: 30,
        width: 30,
    },
    elesearch: {
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0, 
    },
    insearch: {
        // backgroundColor: 'red',
        backgroundColor: '#DB665D',
    },
    input:{
        fontSize: 16,
        color: '#ECA8A9'
    }
  });