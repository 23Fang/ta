//验证各个表单(是否正确等)
//验证名字是否有填写
$('#stuName').onblur = function (e) {
    //onblur当失去焦点
    //验证表单 如果名字为空 就提示请输入名字
    e.target.value === "" ? $('#validateName').innerHTML = '请输入姓名' : $('#validateName').innerHTML = '';
};

//验证邮箱是否有填写或是否填写错误
$('#stuEmail').onblur = function (e) {
    var value = e.target.value;
    //如果没填写邮箱 就提醒(三目运算符)
    value == "" ? $('#validateEmail').innerHTML = '请输入邮箱' : $('#validateEmail').innerHTML = '';
    //如果邮箱不是按照 数字 + @ + 字符/数字 + .com 的话就提醒(正则)
    if (/^(\w*)@(\w*-.)com$/g.test(value) == false && value != '') {
        $('#validateEmail').innerHTML = '格式有误';
    };
    //如果有填写并且格式无误 就删除提醒
    if (/^(\w*)@(\w*).com$/g.test(value) && value != '') {
        $('#validateEmail').innerHTML = '';
        return value;
    };
    //可简写为下方代码
    /* if (e.target.value) {
        if (/^[\w\.-_]+@[\w-_]+\.com$/.test(e.target.value)) {
            $("#validateEmail").innerHTML = "";
        } else {
            $("#validateEmail").innerHTML = "邮箱格式不正确";
        }
    } else {
        $("#validateEmail").innerHTML = "请填写邮箱";
    }*/
};
//验证年龄是否有填写或是否填写错误
$('#stuAge').onblur = function (e) {
    value = e.target.value;
    //如果名字不为空
    if (value) {
        //不为空 就判断格式是否正确(三目运算符判断是否大于0且小于70岁)
        (value < 0 || value > 70) ? $('#validateAge').innerHTML = '范围有误' : $('#validateAge').innerHTML = '';
        //格式为空 就提醒
    } else {
        value == '' ? $('#validateAge').innerHTML = '请输入年龄' : $('#validateAge').innerHTML = '';
    }
}
$('#stuTel').onblur = function (e) {
    value = e.target.value;
    //如果电话为空
    value == '' ? $('#validateTel').innerHTML = '请输入电话' : $('#validateTel').innerHTML = '';

}
$('#stuAddr').onblur = function (e) {
    value = e.target.value;
    //如果地址为空
    value == '' ? $('#validateAddr').innerHTML = '请输入地址' : $('#validateAddr').innerHTML = '';

}