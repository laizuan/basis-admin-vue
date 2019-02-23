export default {
    //四舍五入
    round(number,decimal){
        if(!decimal){
            return Math.round(number); 
        }else if ( decimal <= 0 ) 
            return Math.round(number); 
        else { 
            var cutNumber = Math.pow(10, decimal); 
            return Math.round(number * cutNumber)/cutNumber; 
        } 
    },
    //千分位格式化
    format(number){
        if(isNaN(number)){
            return number;
        }else{
            return (new Number(number)).format()
        }
    },
    //输出单位
    unit(number,unit){
        if(isNaN(number)){
            return number;
        }else{
            return number == null ? "" : number+unit;
        }
    },
    //转换成大写
    toChineseMoney(number){
        if ( number) 
            return Math.toChineseMoney(number); 
        else { 
            return "零元"; 
        } 
    },
}