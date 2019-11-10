import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//这是一级页面
import DiscoverPage from '../pages/discover/index'
import MoviePage from '../pages/movie/index'
import TrendsPage from '../pages/trends/index'
import UserPage from '../pages/users/index'


//这是二级页面
import WebviewPage from '../pages/users/userinfo/wvindex'
import ScanPage from '../pages/users/userinfo/scanindex'
import VideoListPage from '../pages/movie/videolistpage'
import CollectPage from '../pages/discover/songlist/collect'
import MusicPlayPage from '../pages/discover/musicplayer/index'

// 底部导航
const TabNavigator = createBottomTabNavigator({
    Discover: {
        screen: DiscoverPage,
    },
    Movie: {
        screen: MoviePage,
    },
    Trends: {
        screen: TrendsPage,
    },
    User: {
        screen: UserPage,
    }
}, {
    animationEnabled: true, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: 'red', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 14, // 文字大小
        },
    },
});

//堆栈导航
export const HomeStack = createStackNavigator({
    Tab: {
        screen: TabNavigator,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
    Webview: {
        screen: WebviewPage,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
    Scan: {
        screen: ScanPage,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
    VideoList: {
        screen: VideoListPage,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
    SongList: {
        screen: CollectPage,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
    MusicPlay: {
        screen: MusicPlayPage,
        //注册View页面名称
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true  //是否可以使用手势来关闭此屏幕。在iOS上默认为true，在Android上默认为false
        })
    },
},
    {
        initialRouteName: 'Tab', //默认页面
        mode: 'card',
        headerMode: 'screen',
    }
)

export default createAppContainer(HomeStack);