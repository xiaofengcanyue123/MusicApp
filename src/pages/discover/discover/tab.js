import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Recommend from './recommend'
import Video from './video'

  const TabContent = createMaterialTopTabNavigator (
    {
      RecommendTab: {
        screen: Recommend,
        navigationOptions: {
            tabBarLabel: '个性推荐',
        }
      }, 
      VideoTab: {
        screen: Video,
        navigationOptions: {
            tabBarLabel: '主播电台',
        }
      }, 
  },
    {
      initialRouteName: 'RecommendTab',
      swipeEnabled: true,
      animationEnabled: true,
      lazy: false,
      tabBarPosition:'top',
      tabBarOptions: {
        labelStyle: {
          fontSize: 16,
          color: 'white',
          paddingBottom:5,
        },
        indicatorStyle: {
          width: 40,
          height: 4,
          backgroundColor: 'white',
          left: '20.4%',
          top: 42
        },
        tabStyle:{
          
        },
        style: {
          backgroundColor: '#d5453c',
        },
      }
    }
)

const Tab = createAppContainer(TabContent);

module.exports = Tab

