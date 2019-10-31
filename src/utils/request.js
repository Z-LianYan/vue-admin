import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from '@/router/index';

axios.defaults.withCredentials=true;
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000*200, //1m request timeout
  headers:{
    platform:'eryi_private'
  },
  withCredentials: true,
  crossDomain:true 

});
export default service
service.interceptors.request.use(config => {
//   config.headers['eryi-token'] = tools.getToken() //
  return config
}, error => {
  Promise.reject(error)
});
service.interceptors.response.use(
  response => {
    if(response.data.error==433){
      router.currentRoute.path!='/login'?router.replace({path:"/login",query:{redirect:router.currentRoute.fullPath}}):null;//去登录; 
      response.data.data={};    
      return response;
    }else if(response.data.error==403){
      router.currentRoute.path!='/login'?router.replace({path:"/login",query:{redirect:router.currentRoute.fullPath}}):null
      response.data.data={};
      return response;     
    }else{
        return response;
    }    
  },
  error => {
    return Promise.reject(error)
  })
var loading_fns=[];
export function post(url,data,{isLoading=true,hint="加载中..."}={}){
  var loading_fn=null;
  return new Promise((resolve,reject)=>{
    if(isLoading){
      loading_fn = Loading.service({
        text: hint,
        target:""
      });
      loading_fns.push(loading_fn);
    }  
    service({
      url:url,
      method:'POST',
      data:data,
      headers:{}
    }).then((res)=>{
      resolve(res.data);
      loading_fn && loading_fn.close(); //关闭；
    }).catch(err=>{
      console.log(err);
      reject(err);
      loading_fn && loading_fn.close(); //关闭；
      Message.warning(err.message);
    })  
  })
}

export function get(url,requestParams,{isLoading=true,hint="加载中..."}={}){
  var loading_fn=null;
  return new Promise((resolve,reject)=>{
   if(isLoading){
      loading_fn = Loading.service({
          // lock: true,
          text: hint,
          target:""
        })
    }  
    service({
      url:url,
      method:'GET',
      params:requestParams,
      headers:{}      
    }).then((res)=>{
      resolve(res.data);
      loading_fn && loading_fn.close(); //关闭；
    }).catch(err=>{
      reject(err);
      loading_fn && loading_fn.close(); //关闭；
      Message.warning(err.message);
    })  
  })

}
