/**
 * 定义全局公共组件
 * 使用频率比较高的可以定义成全局公共组件，使用频率低的，建议各个模块自行import进来，当成内部组件
 * 组件的对应的标签名是由v-开头，驼峰命名的组件名会被转换成以"-"隔开
 * 如query组件的标签名是<v-query></v-query>
 * 如editPath组件的标签名是<v-edit-path></v-edit-path>
*/

import timePickerPro from './time-picker-pro'
//import collapseTransition from './collapse-transition'
import icons from './icons'
export default {
  timePickerPro,
  icons,
 // collapseTransition
}
