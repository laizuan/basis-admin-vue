import axios from 'axios'
import {Message} from 'iview'
import store from '@/store'
import router from "@/router";
import config from "@/config";
import qs from 'qs'

class HttpRequest {

  constructor(baseUrl = baseURL) {
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
      if (config.method === 'post') {
        config.data = qs.stringify(config.data, { skipNulls: true });
        //config.data = qs.stringify(config.data, { skipNulls: true });
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      console.log('Server Response -----> ', res);
      let reslut = res.data
      if (reslut.code !== config.field.code.success) {
        if (reslut.code === config.field.code.unauthorized) {
          Message.warning({
            content: '登入过期，请重新登入。',
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
          Message.error({
            content: (reslut.msg || reslut.errorMsg),
            duration: 6
          })
          console.info('Server Response Error -----> ', (reslut.errorMsg || reslut.msg));
          return Promise.reject("error")
        }
      } else {
        let status = res.status;
        return reslut
      }
    }, error => {
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
