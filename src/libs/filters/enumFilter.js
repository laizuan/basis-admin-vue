export default {
    //枚举对象输出，输出属性desc的值，枚举格式{"key":"","desc":""}
    output(object){
        if(!object){
            return ""
        }
        if(object instanceof Object){
            if(object instanceof Array){
                if(object.length>0){
                    let str="";
                    for(let i=0; i<object.length; i++){
                        str += (i+1) +"、" + object[i]["desc"] +"  ";
                    }
                    return str;
                }else{
                    return ''
                }
            }else{
                return object["desc"];
            }
        }else{
            return object;
        }
    },
    //枚举对象输出，输出属性key的值，枚举格式{"key":"","desc":""}
    outputKey(object){
        if(!object){
            return ""
        }
        if(object instanceof Object){
            if(object instanceof Array){
                if(object.length>0){
                    let str="";
                    for(let i=0; i<object.length; i++){
                        str += (i+1) +"、" + object[i]["key"] +"  ";
                    }
                    return str;
                }else{
                    return ''
                }
            }else{
                return object["key"];
            }
        }else{
            return object;
        }
    }
}