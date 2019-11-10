import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import Scpage from './scan'
import { Header } from 'react-native-elements';
import LeftComponent from './LeftComponent'
export default class IndexPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<LeftComponent navigation={ this.props.navigation.state.params.nav} />}
                    centerComponent={{ text: '扫一扫', style: { color: '#fff', fontSize: 18 } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#d5453c'
                    }}
                /> 
                <Scpage navigation={this.props.navigation.state.params.nav}/>
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