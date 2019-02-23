export default {
    //数组格式化
    format(value){
        if(!value){
            return ""
        }
        if(value instanceof Array){
            if(value.length == 0){
                return "";
            }
            if (typeof(value[0]) == "number") {
                //数组元素是字符串类型
                return value.join("、");
            }else if (typeof(value[0]) == "string") {
                //数组元素是字符串类型
                return value.join("、");
            } else if(typeof(value[0]) == "object" && value[0] instanceof Object){
                //数组元素是对象类型
                let descList = [];
                for(let e of value){
                    if(!e){
                        continue;
                    }
                    if(e.hasOwnProperty("desc")){
                        descList.push(e.desc);
                    }else if(e.hasOwnProperty("name")){
                        descList.push(e.name);
                    }else if(e.hasOwnProperty("title")){
                        descList.push(e.title);
                    }else if(e.hasOwnProperty("code")){
                        descList.push(e.code);
                    }else if(e.hasOwnProperty("description")){
                        descList.push(e.description);
                    }else if(e.hasOwnProperty("value")){
                        descList.push(e.value);
                    }
                }
                return descList.join("、");
            } else {
                return value
            }
        }else{
            return value;
        }
    }
}