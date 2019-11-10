import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Header } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

export default class MyWeb extends Component {
    onchange(e)
    {
        //alert(e.title)
        this.props.fn(e.title)
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri:this.props.info}}
                    style={{width:'100%'}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    mixedContentMode={'always'} //指定混合内容模式。即WebView是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,
                    //this.onchange(e)
                    onNavigationStateChange={(e)=>{this.props.fn(e.title)} }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5453c',
    },
});