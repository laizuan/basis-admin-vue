export default {
    /**
     * 百分比过滤器
     * @param number
     * @returns {*}
     */
    output(number){
        if (number && !isNaN(number)) {
            return (number * 100) + '%'
        }
        return 0;

    }
}