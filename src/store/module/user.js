import {setToken, getToken} from '@/libs/util'
import user from '@/libs/url/sys/user'
import axios from '@/libs/api.request'

export default {
  state: {
    unreadCount: 0,
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin({commit}, {username, password}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        let params = {
          username,
          password
        };
        axios.request({
          url: 'login',
          params,
          method: 'post'
        }).then(res => {
          const {data} = res
          commit('setToken', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 退出登录
    handleLogOut({state, commit}) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: user.url().logout,
          method: 'post'
        }).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        try {
          axios.request({
            url: user.url().getLoginInfo,
            method: 'get'
          }).then(res => {
            const {data} = res
            commit('setAvator', data.avatar)
            commit('setUserName', data.userName)
            /*commit('setUserId', data.user_id)*/
            commit('setAccess', data.access || [])
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({state, commit}) {
      axios.request({
        url: user.url().unread,
        method: 'get'
      }).then(res => {
        const {data} = res
        commit('setMessageCount', data)
      });
    },
  }
}
