// 封装 DOM 查询函数
// 下面就是我们自己封装的两个函数而已
// 只不过函数名叫做 $ 和 $$
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/**
 * 创建中间 li 标签的函数
 * @param {*} center 要拼接的字符串
 * @param {*} liStartNum 从多少页开始
 * @param {*} liEndNum 到多少页结束
 * @param {*} currentPage 当前页码
 */
function createLi(center, liStartNum, liEndNum, currentPage) {
    for (var i = liStartNum; i <= liEndNum; i++) {
        if (currentPage === i) {
            center += `<li class="pageNum currentPage">${i}</li>`
            //当前页添加样式
        } else {
            center += `<li class="pageNum">${i}</li>`;
        }
    }
    return center;
}

