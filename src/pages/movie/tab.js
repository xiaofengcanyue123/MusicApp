import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import VideoList from './videolist'
import VideoListNew from './videolistnew'

const width = Dimensions.get('window').width

const TabContent = createMaterialTopTabNavigator(
    {
        ListTab: {
            screen: VideoList,
            navigationOptions: {
                tabBarLabel: '推荐',
            }
        },
        RecommendTab: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: 'LOOK直播',
            }
        },
        RecommendTab1: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: '不染',
            }
        },
        RecommendTab2: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: '现场',
            }
        },
        RecommendTab3: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: '翻唱',
            }
        },
        RecommendTab4: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: '翻唱',
            }
        },
        RecommendTab5: {
            screen: VideoListNew,
            navigationOptions: {
                tabBarLabel: '翻唱',
            }
        },
    },
    {
        initialRouteName: 'ListTab',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        optimizationsEnabled: true,
        // backBehavior: false,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'red',
            labelStyle: {
                fontSize: 0.04 * width,
                color: 'white',
                // width: 100,
                // height: 50
            },
            style: {
                backgroundColor: '#d5453c',
            },
            tabStyle: {
                width: 0.26 * width,
                // backgroundColor: '#d5453c',    //注意：设置该属性的背景色会导致下划线失效
            },
            indicatorStyle: {
                height: 2,
                width: 0.13 * width,
                backgroundColor: 'white',
                marginBottom: 5,
                marginLeft: 0.063 * width
            },
            scrollEnabled: true,
            // pressOpacity: 1,    //这东西实现不了，因为仅支持ios和android版本小于5.0
            // pressColor: 'black',
        }
    }
)

const Tab = createAppContainer(TabContent);

module.exports = Tab

