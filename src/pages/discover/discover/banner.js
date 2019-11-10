import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import {Dimensions, Image, Text, View, StyleSheet} from "react-native"

const { height, width } = Dimensions.get('window')
const bannerHeight = height*0.23
const bannerWeight = width*0.96
export default class Banner extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={2.0} 
                dot={<View style={{backgroundColor:'white', width: 8, height: 8,borderRadius: 4, bottom:-20,marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />} 
                activeDot={<View style={{backgroundColor: 'blue', width: 8, height: 8, borderRadius: 4, bottom:-20,marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
                    <View style={styles.slide}>
                        <Image
                            style={{width:bannerWeight,height:bannerHeight,borderRadius:10}}
                            source={require('./image/slider1.jpg')}
                        />
                        <Text style={{position: 'absolute',bottom: 0,right: '2%', paddingTop: 4,paddingBottom: 4,paddingLeft:4,paddingRight:4,backgroundColor:'blue',color:'white',borderTopLeftRadius:5,borderBottomRightRadius:5,fontSize:12}}>新歌首发</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={{width:bannerWeight,height:bannerHeight,borderRadius:10}}
                            source={require('./image/slider2.jpg')}
                        />
                        <Text style={{position: 'absolute',bottom: 0,right: '2%', paddingTop: 4,paddingBottom: 4,paddingLeft:4,paddingRight:4,backgroundColor:'blue',color:'white',borderTopLeftRadius:5,borderBottomRightRadius:5,fontSize:12}}>VIP 专享</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={{width:bannerWeight,height:bannerHeight,borderRadius:10}}
                            source={require('./image/slider3.jpg')}
                        />
                        <Text style={{position: 'absolute',bottom: 0,right: '2%', paddingTop: 4,paddingBottom: 4,paddingLeft:4,paddingRight:4,backgroundColor:'blue',color:'white',borderTopLeftRadius:5,borderBottomRightRadius:5,fontSize:12}}>新碟首发</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={{width:bannerWeight,height:bannerHeight,borderRadius:10}}
                            source={require('./image/slider4.jpg')}
                        />
                        <Text style={{position: 'absolute',bottom: 0,right: '2%', paddingTop: 4,paddingBottom: 4,paddingLeft:4,paddingRight:4,backgroundColor:'blue',color:'white',borderTopLeftRadius:5,borderBottomRightRadius:5,fontSize:12}}>独家</Text>
                    </View>
                </Swiper>
            </View>
            )
    }
}

var styles = StyleSheet.create({
    container: {
        width: width,
        height: bannerHeight,
        marginTop:8,
        marginBottom:10,
    },
    wrapper: {

    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})