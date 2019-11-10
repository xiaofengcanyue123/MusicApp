import { DeviceEventEmitter } from 'react-native';
import RNLocation from "react-native-location";

export function Locations() {
  RNLocation.configure({
    distanceFilter: 5.0
  }).then(() => RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "fine",
      rationale: {
        title: "Location permission",
        message: "We use your location to demo the library",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }
    }
  })).then(granted => {
    if (granted) {
      getPositions();
    }
  });
}

export function getPositions() {
  RNLocation.subscribeToLocationUpdates(
    location => {
      // console.log('location',location)
      let longitude = location[0].longitude//经度
      let latitude = location[0].latitude//纬度

      //通过调用百度地图逆地理接口，传入经纬度获取位置信息，经度在前，纬度在后
      // http://api.map.baidu.com/reverse_geocoding/v3/?ak=flB1rDL2Typ0nGx7d3S7f8MBGjqg6YwK&mcode=73:EE:F0:03:33:64:F3:A5:A0:F1:02:9A:51:8C:2D:30:AE:2E:F9:F5;com.music&output=json&coordtype=wgs84ll&location=38.76623,116.43213
      //通过调用高德地图逆地理接口，传入经纬度获取位置信息，纬度在前，经度在后
      // http://restapi.amap.com/v3/geocode/regeo?output=json&location=116.310003,39.991957&key=fd3ca2d360600d2465739b448ca78c6d&radius=1000&extensions=all
      fetch(`http://api.map.baidu.com/reverse_geocoding/v3/?ak=flB1rDL2Typ0nGx7d3S7f8MBGjqg6YwK&mcode=73:EE:F0:03:33:64:F3:A5:A0:F1:02:9A:51:8C:2D:30:AE:2E:F9:F5;com.music&output=json&coordtype=wgs84ll&location=${latitude},${longitude}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: ``
      })
        .then((response) => response.json())
        .then((jsonData) => {
          try {
            // console.log(JSON.stringify(jsonData))
            let position = jsonData.result.formatted_address
            let result = { longitude, latitude, position }
            // console.log(result)
            DeviceEventEmitter.emit('positiondetail', longitude, latitude, position)
            return result;
          } catch (e) {

          }
        })
        .catch((error) => {
          console.error(error);
        });
      //访问网络结束
    },
    error => {
      console.error(error);
    }
  );
}
