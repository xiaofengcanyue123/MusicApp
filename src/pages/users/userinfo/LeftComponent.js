import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native';

import { Avatar, ListItem, Header, Badge, Tile, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class LeftComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                    <Icon
                        name='chevron-left'
                        color='#fff'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    }
});