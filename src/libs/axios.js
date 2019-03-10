import axios from 'axios'
import {Message} from 'iview'
import api from './api'
import store from '@/store'
import router from "@/router";
import config from "@/config";
import Qs from 'qs'
class HttpRequest {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const navLang = navigator.language,
     localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
    let lang =  localStorage.getItem('local') || localLang  || 'zh-CN'
    const config = {
      baseURL: this.baseUrl,
      headers: {
       // 'Content-Type': 'application/x-www-form-urlencoded',
        'local':  lang
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      let $loading = window.document.getElementById('basis-loading')
      $loading.style.display = "none"
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
       if (!Object.keys(this.queue).length) {
         let $loading = window.document.getElementById('basis-loading')
         $loading.style.display = "block"
       }
     /*  if (config.data) {
         config.data = Qs.stringify(config.data,  { indices: false })
       }*/
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      console.log('Server response -----> ', res);
      let reslut = res.data
      if (reslut.code !== config.field.code.success) {
        if (reslut.code === config.field.code.unauthorized) {
          Message.warning({
            content: api.getI18n('message.loginTimeOut'),
            duration: 2,
            onClose() {
              store.dispatch('FedLogOut')
                .then(() => {
                  router.push({
                    name: 'login'
                  })
                  // location.reload()
                })
            }
          });
        } else if (reslut.code === config.field.code.forbidden) {
          //没有权限
          router.push({
            replace: true,
            name: 'error_401'
          })
        } else {
          //未知异常，一般是服务器内部异常。
          api.notiError(reslut.msg || reslut['errorMsg'])
          console.info('Server response error -----> ', (reslut['errorMsg'] || reslut.msg));
          return Promise.reject("error")
        }
      } else {
        let status = res.status;
        return reslut
      }
    }, error => {
      api.notiError(error)
      this.destroy(url)
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
