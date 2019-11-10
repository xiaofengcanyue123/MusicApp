/**
 * topdetail
 * used to display top page 
 */
import React, { Component } from "react";
import { View, Image, Text, Dimensions, findNodeHandle, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "@react-native-community/blur";
import screen from './utils/screen';
import Modal from "react-native-modal";
import * as WeChat from 'react-native-wechat';
import { connect } from 'react-redux'
import {musicItem} from '../../../actions/counter'
@connect((state) => ({ counter: state.counter }), { musicItem})
export default class TopDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  state = {
    isModalVisible: false
  }
 
  componentDidMount() {
    WeChat.registerApp('wx2a3e51069fcfcc6e').then(function () {
    })
  }
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    let musicImg = this.props.counter.item.musicImg
    let musicTitle = this.props.counter.item.musicTitle
    console.log("图片"+JSON.stringify(this.props.counter.item))
    return (

      <View style={styles.modalStyle}>

        {/* 弹出分享图标 */}
        <Modal isVisible={this.state.isModalVisible}>

          <TouchableOpacity onPress={this.toggleModal}>
            <View style={{
              height: screen.height,
            }}>

            </View>
          </TouchableOpacity>

          <View style={styles.sharePage}>
              <TouchableOpacity text='微信好友分享-链接'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToSession({
                                                  title: musicTitle,
                                                  description: '流年优光影',
                                                  thumbImage: musicImg,
                                                  type: 'news',
                                                  webpageUrl: 'https://music.163.com/m/playlist?id=3000814267&userid=372352497',
                                              })
                                                  .catch((error) => {
                                                      ToastShort(error.message);
                                                  });
                                          } else {
                                              ToastShort('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                >

              <View style={styles.picwe}>
                <Image
                  source={require('./assets/songlist/wechat.png')}

                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity text='微信朋友圈分享-链接'
              onPress={() => {
                WeChat.isWXAppInstalled()
                  .then((isInstalled) => {
                    if (isInstalled) {
                      WeChat.shareToTimeline({
                        title: musicTitle,
                        description: '流年优光影',
                        thumbImage: musicImg,
                        type: 'news',
                        webpageUrl: 'https://music.163.com/m/playlist?id=3000814267&userid=372352497'
                      })
                        .catch((error) => {
                          ToastShort(error.message);
                        });
                    } else {
                      ToastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                  });
              }}>
              <View style={styles.picwe}>
                <Image
                  source={require('./assets/songlist/wechatfriend.png')}

                />
              </View>

            </TouchableOpacity>
          </View>

        </Modal>

        <View>
          <View style={styles.container}>
            <Image
              ref={img => {
                this.backgroundImage = img;
              }}
              source={{ uri: musicImg }}
              style={styles.absolute}
              onLoadEnd={this.imageLoaded.bind(this)}
            />
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType="light"
              blurAmount={50}
            />
           
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Discover')}}>
           <View >
            <Image
              source={require('./assets/songlist/backicon.png')}
              style={styles.arrowleft}
            />
           </View>
           </TouchableOpacity>

           <View  >
            <Text style={styles.text}>歌单</Text>
            </View>
            <View style={styles.container1}>
            <Image
              source={require('./assets/songlist/checkmore2.png')}
              style={styles.checkmore2}
            />
            
            <Image
              source={require('./assets/songlist/voiceprint.png')}
              style={styles.voiceprint}
            />
            </View>

          </View>
          <View>
            <Image
              source={{ uri: musicImg }}
              style={styles.pic}
            />
            <Text style={styles.pictext}>{musicTitle}</Text>
            {/* <Text style={styles.pictext1}>聆听属于你的日系韵律</Text> */}

            <View style={styles.imagText}>
              <View>
                <Image
                  source={{ uri: musicImg }}
                  style={styles.littleImg}
                />
              </View>
              <View>
                <Text style={styles.littimgtext}>云音乐樱花酱</Text>
              </View>
            </View>
          </View>
          <View style={styles.labellist}>
            <Image
              source={require('./assets/songlist/message1.png')}
              style={styles.label}
            />
            <TouchableOpacity onPress={this.toggleModal}>
              <Image
                source={require('./assets/songlist/share.png')}
                style={styles.label}
              />
            </TouchableOpacity>

            <Image
              source={require('./assets/songlist/download3.png')}
              style={styles.label}
            />
            <Image
              style={styles.label}
              source={require('./assets/songlist/more.png')}
            ></Image>
          </View>
          <View style={styles.labelTextStyle}>
            <Text style={styles.labelText}>151</Text>
            <Text style={styles.labelText}>1351</Text>
            <Text style={styles.labelText}>下载</Text>
            <Text style={styles.labelText}>多选</Text>
          </View>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  container1: {
    flexDirection:'row'
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: screen.width,
    height: screen.height / 2,
  },
  pic: {
    position: "absolute",
    top: screen.height / 2000,
    left: screen.width / 30,
    bottom: 0,
    right: 0,
    width: screen.width / 3,
    height: screen.width / 3,
  },
  pictext: {
    marginTop: screen.height / 50,
    marginLeft: screen.width / 5 * 2,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SimSun',
  },
  pictext1: {
    marginTop: screen.height / 1200,
    marginLeft: screen.width / 5 * 2,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SimSun',

  },
  text: {
    height: 40,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'SimSun',
    margin:5
  },
  arrowleft: {
    bottom: 0,
    width: 30,
    height: 30,
    margin:5
  },
  checkmore2: {
    top: 0,
    bottom: 0,
    width: 40,
    height: 40,
  },
  voiceprint: {
    top: 0,
    bottom: 0,
    width: 40,
    height: 40,
  },

  labellist: {
    top: screen.height / 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    width: 25,
    height: 25
  },
  labelTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  labelText: {
    color: '#fff',
    top: screen.height / 15,
  },
  modalStyle: {
    flexDirection: 'column',
  },

  sharePage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: screen.height / 10,
    right: 18,
    width: screen.width,
    backgroundColor: '#fff',
    height: screen.height / 6,

  },
  picwe: {
    marginLeft: 15,
  },
  imagText: {
    flexDirection: 'row',
    marginTop: screen.height / 60,
    marginLeft: screen.width / 5 * 2,
  },
  littleImg: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  littimgtext: {
    color: '#fff',
    marginTop: 4,
    marginLeft: 2
  },
});