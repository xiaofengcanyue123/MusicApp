import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Headpage from './head'
import Bodypage from './body'

export default class IndexPage extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Headpage/>
              <Bodypage navigation={this.props.navigation}/>
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