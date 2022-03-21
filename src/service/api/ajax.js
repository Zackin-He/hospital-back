import axios from "axios";
// axios.defaults.withCredentials = true
export default function ajax(url='',params={},type='GET') {
    // 1.变量
    let promise;
    //2.返回promise对象
    return new Promise((resolve,reject) =>{
        //2.1判断请求类型
        if (type.toUpperCase() === 'GET'){//get请求
            //2.2拼接字符串
            let paramsStr = '';
            //2.3遍历
            Object.keys(params).forEach(key=>{
                paramsStr += key + '=' + params[key] + '&';
            });
            //2.4过滤
            if (paramsStr){
                paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'));
                url+='&'+paramsStr;
            }
            //2.5拼接完整路径
            //2.6发起get请求
            promise = axios.get(url);
        }else if (type.toUpperCase() === 'POST'){//post请求
            //2.7发起post请求
            promise = axios.post(url,params);
        }
        //2.8处理结果并返回
        promise.then((response)=>{
            resolve(response.data);
        }).catch((err)=>{
            reject(err);
        })
    });
}
