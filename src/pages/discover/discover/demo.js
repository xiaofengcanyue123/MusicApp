import React, { Component } from "react";
import { Image, FlatList, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity,DeviceEventEmitter } from "react-native";
import Banner from './banner';
import Classify from './classify';
import { connect } from 'react-redux'
import { musicList, loadMore, musicItem } from "../../../actions/counter"
import PullList from './pullList';

var screenWidth = Dimensions.get('window').width;
var cols = 3;
var cellW = 0.3*screenWidth;
var cellH = 0.38*screenWidth;
var vMargin = (screenWidth - cellW * cols) / (cols + 1);

@connect((state) => ({counter: state.counter}), {musicList, loadMore, musicItem})
export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      isRefreshing:false,//下拉控制
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    };
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
    this.onPullRelease=this.onPullRelease.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  //自定义下拉刷新指示器
  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = {position: 'absolute', left: 10000};
    const show = {position: 'relative', left: 0};
    if (pulling) {
      this.txtPulling && this.txtPulling.setNativeProps({style: show});
      this.txtPullok && this.txtPullok.setNativeProps({style: hide});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
    } else if (pullok) {
      this.txtPulling && this.txtPulling.setNativeProps({style: hide});
      this.txtPullok && this.txtPullok.setNativeProps({style: show});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
    } else if (pullrelease) {
      this.txtPulling && this.txtPulling.setNativeProps({style: hide});
      this.txtPullok && this.txtPullok.setNativeProps({style: hide});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60,zIndex:1}}>
        <ActivityIndicator size="small" color="red" />
        <View ref={(c) => {this.txtPulling = c;}}>
          <Text>继续下拉刷新...</Text>
        </View>
        <View ref={(c) => {this.txtPullok = c;}}>
          <Text>松开刷新......</Text>
        </View>
        <View ref={(c) => {this.txtPullrelease = c;}}>
          <Text>刷新中......</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.bigbox}>
        <PullList
          //FlatList基本属性
          data={this.props.counter.list}
          renderItem={this._renderMusic}
          style={styles.list}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          ListHeaderComponent={this.header}

          //FlatList上拉加载更多
          ListFooterComponent={this._renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}

          //PullList下拉刷新
          onPullRelease={this.onPullRelease}
          topIndicatorRender={this.topIndicatorRender}
          topIndicatorHeight={60}
          //控制下拉刷新状态的属性，为true时显示头部刷新组件，为false则隐藏
          isRefreshing={this.state.isRefreshing}
        />
      </View>
    );
  }

  header = () => {
    return (
      <View>
        <Banner /> 
        <Classify />
        <View style={styles.header}>
          <Text style={{ marginTop: 12, marginLeft: vMargin, fontSize: 17, color: '#000000' }}>推荐歌单</Text>
          <TouchableOpacity onPress={() => { alert('歌单广场') }}>
            <Text style={{ marginTop: 12, marginRight: vMargin, fontSize: 14, color: '#666666' }}>歌单广场</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderMusic = ({ item }) => {
    return (
      <View style={item == '' ? styles.hidden : ''}>
        <TouchableOpacity onPress={() => { 
          DeviceEventEmitter.emit('SongList', item.musicId)
          this.props.musicItem(item) 
           }}>
          <View style={styles.body}>
            <Image source={{ uri: item.musicImg }} style={styles.thumbnail} />
            <Text style={styles.title} numberOfLines={2}>{item.musicTitle}</Text>
          </View>
          <View style={styles.play}>
            <Image source={require('./image/listener.png')} style={{ height: 14, width: 14 }} />
            <Text style={styles.txt}>{item.musicPlayNum}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderFooter = () => {
    if (this.state.showFoot === 1) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }

  onPullRelease(resolve) {
    console.log('下拉刷新')
    this.setState({isRefreshing:true});
    this.componentDidMount();
    setTimeout(() => {
      this.setState({isRefreshing:false})
    }, 500);
  }

  onEndReached = () => {
    console.log('上拉触底')
    let that = this;
    // console.log(that.state.showFoot)
    // 如果是正在加载中或没有更多数据了，则返回
    // if (that.state.showFoot != 0) {
    //   return;
    // } else {
    //   that.fetchData();
    // }
    that.props.loadMore().then((res) => {
      // console.log(res)
      //  console.log(this.props.counter)
      
      that.setState({showFoot:2 })
    })
    that.forceUpdate() 
     // console.log(this.props.counter)
    //底部显示正在加载更多数据
  }
  //获取数据 
  fetchData() {
    //这里进行网络请求数据
    // return fetch(`http://localhost:8081/musiclist.json`)
    //   .then((res) => { return res.json() })
    //   .then((resp) => {
    //     if (resp.status == 200) {
    //       console.log(resp);
    //       this.setState({ data: this.state.data.concat(resp.result), showFoot: 0 });
    //     }
    //     else {
    //       this.setState({ showFoot: 1 });
    //     }
    //   });
    this.props.musicList().then(this.setState({ showFoot: 0 }))
  }

}

var styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 12,
  },
  bigbox: {
    display: 'flex',
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  hidden: {
    display: 'none'
  },
  body: {
    width: cellW,
    height: cellH,
    alignItems: 'center',
    marginLeft: vMargin,
    marginBottom: 8
  },
  thumbnail: {
    width: cellW,
    height: cellW,
    borderRadius: 4
  },
  title: {
    marginTop: 1,
    fontSize: 13,
    marginLeft: 3,
    color: '#474843'
  },
  play: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'absolute',
    right: 6,
    top: 2,
  },
  txt: {
    color: 'white',
    fontSize: 12
  },
  list: {

  }
});
