import {localRead, localSave} from './util'

/**
 * @Author laiz
 * @Description //TODO 系统常亮
 * @Date 19:06 2019/1/31
 * @Param
 * @return
 **/
export default {

  VisibleStateEnum: {
    INVISIBLE: 1,//隐藏
    VISIBLE: 0//显示
  },

  EnableEnum: {
    ENABLE: 1,//启用
    DISABLE: 0//禁用
  },

  MenuTypeEnum: {
    SYSTEM: 0,
    MENU: 1,
    BUTTON: 2
  },

  getEnum(vm, filed, type) {
    let value = localRead(type)
    if (value) {
      vm[filed] = JSON.parse(value)
    } else {
      vm.$api.get('/enums/get', {type}, (res) => {
        localSave(type, JSON.stringify(res.data));
        vm[filed] = res.data;
      })
    }
  }
}
