


/**
 * songList页面
 * used to display song list
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import screen from './utils/screen'
import { connect } from 'react-redux'
// import { songList } from '../../../actions/songList'

import {  getMusicList ,changeMusic} from "../../../actions/player"

@connect((state) => ({ player: state.player }), { getMusicList ,changeMusic})


export default class SongList extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  componentDidMount() {
    this.props.getMusicList()
  }
  render() {
    console.log("qqq" + JSON.stringify(this.props.player.musiclist))
    return (

      <View style={styles.container}>
        <View style={styles.songListView}>
          <View style={styles.songListTop}>
            <View style={styles.songPlay}>
              <TouchableOpacity onPress={() => {
                alert('播放')
              }}>
                <Image
                  source={require('./assets/songlist/play1.png')}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
              <Text style={styles.playText}>播放全部(共45首)</Text>
            </View>

            <TouchableOpacity onPress={() => {
              alert('收藏')
            }}>
              <View style={styles.collectView}>
                <Text style={styles.collectText}>+收藏(19.4万)</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.playLine} />
          <FlatList
            style={{height:'88%'}}
            ItemSeparatorComponent={this._separator}//add separator         
            ListFooterComponent={this._createListFooter} //add foot layout
            data={this.props.player.musiclist}
            renderItem={({ item ,index}) =>

              <TouchableOpacity onPress={() => {
                // alert('播放音乐')
                this.props.changeMusic(index)
                this.props.navigation.navigate('MusicPlay')
              }}>
                {/* 控制songId和其他在一行 */}
                <View style={styles.list}>
                  {/* songId */}
                  <View style={styles.songIdSty}>
                    <Text style={styles.songId} >{item.id}</Text>
                  </View>

                  <View style={styles.distence}>
                    {/* 控制songName和songExplain在一行 */}
                    <View style={styles.list}>
                      {/* songName */}
                      <View>
                        {/* {item.songName.length > 18 ? <Text style={styles.songNameStyle}>
                          {item.songName.substring(0, 18)}...</Text> : */}
                        <Text style={styles.songNameStyle}>{item.songName}</Text>
                      </View>

                      {/* songExplain */}
                      <View>
                        {/* {item.songExplain.length > 18 ? <Text style={styles.songExplainStyle}>
                          {item.songExplain.substring(0, 18)}...</Text> :  */}
                        <Text style={styles.songExplainStyle}>{item.songExplains}</Text>
                      </View>

                    </View>
                    {/* 控制songLabel和singer在一行 */}
                    <View style={styles.list}>

                      {/* songLabel */}
                      <View style={styles.labellist}>
                        {/* {item.songLabel.map((index, key) => */}
                        <Text style={styles.songLabel}> {item.songLabel}</Text>
                        {/* )} */}
                      </View>

                      {/* singer */}
                      <View>
                        {/* {item.singer.length > 18 ? <Text style={styles.singerStyle}>
                          {item.singer.substring(0, 18)}...</Text> :  */}
                        <Text style={styles.singerStyle}>{item.singer}</Text>
                      </View>

                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </View>

    );
  }
  /**
     * 分割线
     */
  _separator() {
    return <View style={styles.separator} />;
  }

  /**
   * create footer layout
   */
  _createListFooter() {
    return (
      <TouchableOpacity onPress={() => {
        alert('跳转到收藏列表')
      }}>
        <View style={styles.playLine} />
        <View style={styles.songListTop}>
          <View style={styles.collectImage}>
            <Image
              source={{ uri: 'https://p2.music.126.net/xXp7rcgDZpK2dG3gR-l2Xw==/109951164388323891.jpg' }}
              style={styles.collectImageIcon}
            />
            <Image
              source={{ uri: 'https://p2.music.126.net/xXp7rcgDZpK2dG3gR-l2Xw==/109951164388323891.jpg' }}
              style={styles.collectImageIcon}
            />
            <Image
              source={{ uri: 'https://p2.music.126.net/xXp7rcgDZpK2dG3gR-l2Xw==/109951164388323891.jpg' }}
              style={styles.collectImageIcon}
            />
          </View>
          <View>
            <Text style={styles.collectImageText}>299.8万人收藏</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}



var styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    //height:screen.height -screen.height /12,
    //backgroundColor:'red',
  },
  //songlist页面样式圆角和背景色
  songListView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff'
  },
  songListTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songPlay: {
    flexDirection: 'row',
  },
  playIcon: {
    width: 20,
    height: 20,
    margin: 9
  },
  playText: {
    padding: 9,
    fontSize: 15
  },
  collectView: {
    position: 'relative',
    right: 0,
    backgroundColor: '#f35643',
    borderTopRightRadius: 10,
  },
  collectText: {
    padding: 9,
    color: '#fff',
  },
  playLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f7fb',
    marginLeft: 36
  },
  songIdSty: {
    width: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#f8f7fb',
    marginLeft: 36,
  },
  collectImage: {
    flexDirection: 'row',
    marginTop: 7
  },
  collectImageIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 8,
  },
  collectImageText: {
    top: 10,
  },
  distence: {
    position: 'relative',
    left: 10,
  },
  list: {
    flexDirection: 'row',
    marginTop: 2,
  },
  songId: {
    textAlign: 'left',
    color: '#aaa',
    left: 13,
    fontSize: 18,
    top: 10,
  },
  songNameStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2f2f2f',
  },
  songExplainStyle: {
    color: '#aeaeae',
    fontSize: 14,
    fontFamily: 'Arial',
    textAlign: 'right'

  },
  singerStyle: {
    color: '#aeaeae',
    fontSize: 12,
    fontFamily: 'Arial',
  },
  songLabel: {
    borderRadius: 4,
    margin: 3,
    color: 'red',
    fontSize: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  labellist: {
    flexDirection: "row",
    marginBottom: 6,
    marginLeft: 0,
    marginRight: 2,

  },

});