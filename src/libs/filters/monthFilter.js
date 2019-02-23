export default {
    //日期格式化
    format(value) {
        if(!value){
            return ""
        }
        let format = "yyyy-MM";
        if (value instanceof Date) {
            return value.format(format);
        } else if (typeof value == "number") {
            return (new Date(value)).format(format);
        } else {
            return value;
        }
    }
}