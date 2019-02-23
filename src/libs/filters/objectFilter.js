export default {
    /**
     * 对象属性级联输出，只要存在某一级的为null，就直接返回空字符
     * @param {*} object 要输出属性的对象
     * @param {*} expression 要输出的属性表达式，如"man.name"
     */
    output(object, expression){
        if(!object){
            return ""
        }
        if(object instanceof Object){
            let expressions = expression.split(".");
            if(expressions.length > 1){
                let newObject = object;
                for(let i = 0; i< expressions.length; i++){
                    newObject = newObject[expressions[i]];
                    if(!newObject){
                        return "";
                    }
                }
                return newObject;
            }else{
                return object[expressions[1]];
            }
        }else{
            return object;
        }
    }
}