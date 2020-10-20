import axios from 'axios';

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      catch: false,
      referrer: 'no-referrer',
    });
    instance(options)
      .then(response => { //then 请求成功之后进行什么操作
        resolve(response); //把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error);
        reject(error);
      });
  });
}