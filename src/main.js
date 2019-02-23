// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import iView from "iview";
import i18n from "@/locale/index";
import config from "@/config";
import importDirective from "./libs/directive";
import installPlugin from "@/plugin";
import "./index.less";
import "@/assets/icons/iconfont.css";
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})


/**
 * @Author
 * @Description //TODO 引用API文件
 * @Date 10:26 2018/11/15
 * @Param
 * @return
 **/
import api from "./libs/api";

// 将API方法绑定到全局
Vue.prototype.$api = api


/**
 * @Author
 * @Description //TODO 创建全局过滤器
 * @Date 9:51 2018/11/15
 * @Param
 * @return
 **/
import filters from "./libs/filters/"; //加载过滤器

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

import components from './components/' //加载公共组件
// 函数返回对象的属性名；
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
  Vue.component(`v${name}`, components[key])//注册组件
})

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])//注册过滤器
})


/**
 * @Author
 * @Description //TODO 对Date的扩展，将 Date 转化为指定格式的String
 * @Date 9:50 2018/11/15
 * @Param
 * @return
 **/
Date.prototype.format = function (fmt) {
  if (!fmt) {
    fmt = "yyyy-MM-dd"
  }
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * @Author
 * @Description //TODO 加法
 * @Date 9:49 2018/11/15
 * @Param
 * @return
 **/
Math.add = function (...args) {
  let add = function (arg1, arg2) {
    if (isNaN(arg1) && isNaN(arg2)) {
      return 0;
    } else if (!isNaN(arg1) && isNaN(arg2)) {
      return arg1;
    } else if (isNaN(arg1) && !isNaN(arg2)) {
      return arg2;
    }
    let r1;
    let r2;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    const c = Math.abs(r1 - r2);
    const m = Math.pow(10, Math.max(r1, r2));
    let newArg1;
    let newArg2;
    if (c > 0) {
      const cm = Math.pow(10, c);
      if (r1 > r2) {
        newArg1 = Number(arg1.toString().replace('.', ''));
        newArg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        newArg1 = Number(arg1.toString().replace('.', '')) * cm;
        newArg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      newArg1 = Number(arg1.toString().replace('.', ''));
      newArg2 = Number(arg2.toString().replace('.', ''));
    }
    const returnValue = (newArg1 + newArg2) / m;
    return returnValue;
  }

  return args.reduce((accumulator, currentValue) => {
    return add(accumulator, currentValue) * 1
  })
}


/**
 * @Author
 * @Description //TODO 减法
 * @Date 9:49 2018/11/15
 * @Param
 * @return
 **/
Math.sub = function (...args) {
  let sub = function (arg1, arg2) {
    if (isNaN(arg1) && isNaN(arg2)) {
      return 0;
    }else if(!isNaN(arg1) && isNaN(arg2)){
      return arg1;
    }else if(isNaN(arg1) && !isNaN(arg2)){
      return arg2;
    }
    let r1;
    let r2;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    const m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    const n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }
  return args.reduce((accumulator, currentValue) => {
    return sub(accumulator, currentValue) * 1
  })

}
/**
 * @Author
 * @Description //TODO 乘法
 * @Date 9:48 2018/11/15
 * @Param
 * @return
 **/
Math.mul = function (...args) {
  let mul = function (arg1, arg2) {
    if (isNaN(arg1) && isNaN(arg2)) {
      return 0;
    }else if(!isNaN(arg1) && isNaN(arg2)){
      return arg1;
    }else if(isNaN(arg1) && !isNaN(arg2)){
      return arg2;
    }
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
    }

    try {
      m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }
  return args.reduce((accumulator, currentValue) => {
    return mul(accumulator, currentValue) * 1
  })
}
/**
 * @Author
 * @Description //TODO 除法
 * @Date 9:48 2018/11/15
 * @Param
 * @return
 **/
Math.div = function (...args) {
  let div = function (arg1, arg2) {
    if (isNaN(arg1) || arg1 == 0 || isNaN(arg2) || arg2 == 0) {
      return 0;
    }
    let t1 = 0;
    let t2 = 0;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) { // eslint-disable-line  no-empty
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) { // eslint-disable-line  no-empty
    }
    const r1 = Number(arg1.toString().replace('.', ''));
    const r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }
  return args.reduce((accumulator, currentValue) => {
    return div(accumulator, currentValue) * 1
  })
}

/**
 * @Author
 * @Description //TODO 四舍五入函数,浮点数
 * @Date 9:47 2018/11/15
 * @Param myFloat : 要进行四舍五入的数字
 *         mfNumber : 小数点后位数
 * @return
 **/
Math.floatRound = function (myFloat, mfNumber) {
  if (mfNumber <= 0)
    return Math.round(myFloat);
  else {
    var cutNumber = Math.pow(10, mfNumber);
    return Math.round(myFloat * cutNumber) / cutNumber;
  }
}

/**
 * @Author
 * @Description //TODO 金额转换成大写
 * @Date 9:47 2018/11/15
 * @Param
 * @return
 **/
Math.toChineseMoney=function(number){
  var split = String(number).split(".");
  if(split[0].length > 12){
    return "金额太大,无法转换,请输入不大于千亿的金额";
  }
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
  var head = number < 0? '欠': '';
  number = Math.abs(number);

  var s = '';

  for (var i = 0; i < fraction.length; i++)
  {
    s += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  number = Math.floor(number);

  for (var i = 0; i < unit[0].length && number > 0; i++)
  {
    var p = '';
    for (var j = 0; j < unit[1].length && number > 0; j++)
    {
      p = digit[number % 10] + unit[1][j] + p;
      number = Math.floor(number / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}


/**
 * 定义原生使用占位符的方法，格式化数据
 * @author sky
 * @date 2018-07-09
 * @returns {*}
 */
String.prototype.format = function () {
  // 数据长度为空，则直接返回
  if (arguments.length == 0){
    return this;
  }

  // 使用正则表达式，循环替换占位符数据
  for (var result = this, i = 0; i < arguments.length; i++){
    result = result.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return result;
  }
};

/**
 * @Author
 * @Description //TODO 创建全局的内容格式化输出
 * @Date 9:27 2018/11/16
 * @Param   value 要输出的值
 type 值类型 如date, int, double, string……
 format 格式 date类型可以不设置format,自动根据type格式化,如果是数字类型的,把format设置为",",可以按千分位格式化
 * @return
 **/
Vue.prototype.$format = function (value, type, format, object) {
  if (value instanceof Date) {
    //日期
    if (format) {
      if (typeof(format) == "function") {
        return format(value, object, this);
      } else if (format instanceof Array) {
        return format[value + ""];
      }
    } else if (type == "date") {
      //日期类型
      return value.format('yyyy-MM-dd');
    } else if (type == "datetime") {
      //日期时间类型
      return value.format("yyyy-MM-dd hh:mm:ss");
    } else if (type == "month") {
      //年月类型
      return value.format("yyyy-MM");
    } else {
      //未知类型
      return value.format();
    }
  } else if (typeof(value) == "number") {
    //数字
    if (format) {
      if (typeof(format) == "function") {
        return format(value, object, this);
      } else if (format instanceof Object) {
        return format[value + ""];
      } else if (format == ",") {
        //千分位输出
        return (new Number(value)).format();
      }
    } else {
      //未知类型
      return value == 0 ? "0" : value
    }
  } else if (typeof(value) == "boolean") {
    //布尔
    if (format) {
      if (typeof(format) == "function") {
        return format(value, object, this);
      } else if (format instanceof Object) {
        return format[value + ""];
      }
    } else {
      return value
    }
  } else if (value instanceof Array) {
    //数组
    if (format) {
      if (typeof(format) == "function") {
        return format(value, object, this);
      }
    } else if (type == "string") {
      return value.join("、");
    } else if (type == "enum") {
      let descList = [];
      for (let e of value) {
        if (e) {
          descList.push(e.desc);
        }
      }
      return descList.join("、");
    } else if (typeof(value[0]) == "object" && value[0] instanceof Object) {
      //数组元素是对象类型
      let descList = [];
      for (let e of value) {
        if (!e) {
          continue;
        }
        if (e.hasOwnProperty("desc")) {
          descList.push(e.desc);
        } else if (e.hasOwnProperty("description")) {
          descList.push(e.description);
        } else if (e.hasOwnProperty("name")) {
          descList.push(e.name);
        } else if (e.hasOwnProperty("title")) {
          descList.push(e.title);
        } else if (e.hasOwnProperty("code")) {
          descList.push(e.code);
        } else if (e.hasOwnProperty("value")) {
          descList.push(e.value);
        }
      }
      return descList.join("、");
    } else {
      return value
    }
  } else {
    if (format) {
      if (typeof(format) === "function") {
        return format(value, object, this);
      } else if (format instanceof Array) {
        return format[value + ""];
      }
    }
    //其他
    if (type === "enum") {
      //枚举类型
      return value ? value.desc : ""
    } else {
      //未知类型
      return value
    }
  }
}

const app = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

window.app = app;
