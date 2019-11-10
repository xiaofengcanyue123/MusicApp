export function createAction(options) {
  const { url, payload, method = 'GET', type} = options
  return (dispatch) => {
    //alert(url)
    return fetch(url,{
      method:method,
      //header:{
      //    'Accept':'application/json',//告诉服务器，我们能接受json格式的返回类型，
      //    'Content-Type':'application/json',//告诉服务器，我们提交的数据类型
      //},
      //body:JSON.stringify(data),//(把你想提交得数据序列化为json字符串类型，然后提交)body中的数据就是我们需要向服务器提交的数据,比如用户名,密码等
  }) .then((response) => response.json())
    .then((res) => {
      //alert(res.username)
      dispatch({ type, payload: res })
      return res
    }).catch((error) => {
      console.error(error);
    });
  }
}


export function createActionNo(options) {
  const { payload, type } = options
  return (dispatch) => {
    console.log('**********createActionNo*********' + type)
    return dispatch({ type, payload })
  }
}
