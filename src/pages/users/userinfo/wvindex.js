import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Wbpage from './webview'
import { Header } from 'react-native-elements';
import LeftComponent from './LeftComponent'

export default class IndexPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }

    restTitle(val) {
        if (val != '') {
            this.setState({
                title: val
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<LeftComponent navigation={this.props.navigation.state.params.nav} />}
                    centerComponent={{ text: this.state.title, style: { color: '#fff', fontSize: 18 } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#d5453c'
                    }}
                />
                <Wbpage info={this.props.navigation.state.params.url} fn={this.restTitle.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});