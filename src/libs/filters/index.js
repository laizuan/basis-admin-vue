/**
 * 定义全局公共过滤器
*/
import arrayFilter from './arrayFilter'//数组过滤器
import dateFilter from './dateFilter'//日期过滤器
import dateTimeFilter from './dateTimeFilter'//日期时间过滤器
import monthFilter from './monthFilter'//日期过滤器
import numberFilter from './numberFilter'//数字过滤器
import enumFilter from './enumFilter'//枚举值输出过滤器
import objectFilter from './objectFilter'//对象属性值输出过滤器
import percentageFilter from './percentageFilter'//百分比输出过滤器
import booleanFilter from './booleanFilter'//布尔过滤器
export default {
    "!a": arrayFilter.format,//数组格式化
    "!df": dateFilter.format,//日期格式化yyyy-MM-dd
    "!dtf": dateTimeFilter.format,//日期时间格式化yyyy-MM-dd hh:mm:ss
    "!mf": monthFilter.format,//年月格式化yyyy-MM
    "!nr": numberFilter.round,//数字四舍五入
    "!nf": numberFilter.format,//数字千分位格式化
    "!nu": numberFilter.unit,//数字单位一起输出，当数字无效时，也不输出单位
    "!ncm": numberFilter.toChineseMoney,//转换成金额大写
    "!e": enumFilter.output,//枚举类型输出desc,枚举格式为{key:'',desc:''}
    "!ek": enumFilter.outputKey,//枚举类型输出key,枚举格式为{key:'',desc:''}
    "!": objectFilter.output,//对象属性值输出
    "!%": percentageFilter.output,//数字百分比输出
    "!b": booleanFilter.output, //布尔过滤器
}