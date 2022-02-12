var editStuId = null;//保存要编辑学生的id
var curPage = 1;//当前页码数，默认从第一页
var pageNum = null;//存储总页码数，根据数据量来计算总页数的值
var eachPage = 5;//每一页显示多少条


//初始化的学生数据
var stuData = [
  { "stuId": 1, "stuName": "方佳仪", "stuGender": "男", "stuEmail": "2678574880@qq.com", "stuAge": 100, "stuTel": 15626612664, "stuAddr": "外省个" },
  { "stuId": 2, "stuName": "吴渣男", "stuGender": "男", "stuEmail": "2805273072@qq.com", "stuAge": 22, "stuTel": 13433362734, "stuAddr": "广东省 汕头市" },
  { "stuId": 3, "stuName": "佳仪爸爸（方汉星）", "stuGender": "男", "stuEmail": "2389480512@qq.com", "stuAge": 20, "stuTel": 15017831616, "stuAddr": "广东省 汕头市" },
  { "stuId": 4, "stuName": "赵局长", "stuGender": "女", "stuEmail": "877589505@qq.com", "stuAge": 18, "stuTel": 15815166296, "stuAddr": "广东省 汕头市" },
  { "stuId": 5, "stuName": "郑院长", "stuGender": "女", "stuEmail": "1603854530@qq.com", "stuAge": 18, "stuTel": 13682932773, "stuAddr": "广东省 汕头市" },
];



//因为导航栏切换逻辑会反复用到，所以封装成两个函数
function goToStuList() {
  $('.leftMenuItem').classList.add("itemActive");
  $$('.leftMenuItem')[1].classList.remove("itemActive");
  $('.rightContent>div').classList.remove('notShow');
  $$('.rightContent>div')[1].classList.add('notShow');
}

function goToAddStu(id) {
  if (id) {
    //说明是编辑学生
    //获取要编辑的学生
    var editStu = stuData.filter(function (item) {
      return item.stuId == id;
    })[0];
    //表单的回填
    $('#stuName').value = editStu.stuName;
    $('#stuEmail').value = editStu.stuEmail;
    $("#stuAge").value = editStu.stuAge;
    $('#stuTel').value = editStu.stuTel;
    $('#stuAddr').value = editStu.stuAddr;
    if (editStu.stuGender === "男") {
      $('.gender').checked = true;
    } else {
      $$('.gender')[1].checked = true;
    }
    editStuId = editStu.stuId;
    $('#addStuBtn').value = "确认修改";
  }
  $('.leftMenuItem').classList.remove("itemActive");
  $$('.leftMenuItem')[1].classList.add("itemActive");
  $('.rightContent>div').classList.add("notShow");
  $$('.rightContent>div')[1].classList.remove("notShow");
}

function changeItem() {
  $('.leftMenu').addEventListener('click', function (e) {
    if (e.target.innerHTML === "学生列表") {
      //说明用户点击的是学生列表
      goToStuList();
    } if (e.target.innerHTML === "新增学生") {
      //说明点击的是新增列表
      goToAddStu();
    }
  })
}
//渲染表格内容
function renderContent(arr) {
  //渲染分页
  renderPager(arr);

  //截取学生数据，每页只显示五条数据
  // 第一页 1-5 （0-5）
  // 第二页 6-10 （5-10）
  // 第三页 11-15 （10-15）
  // arr.slice((当前页-1) * 每一页的条数，当前页 * 每一页的条数)
  arr = arr.slice((curPage - 1) * eachPage, curPage * eachPage);


  $('#stuTable').innerHTML = "";
  //表头
  var thead = `
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>邮箱</th>
            <th>年龄</th>
            <th>手机号</th>
            <th>住址</th>
            <th>操作</th>
          </tr>
        </thead>
  `;

  //表内容
  var tBody = arr.map(function (item) { //item为stuData的每个对象
    return `
      <tr>
        <td>${item.stuId}</td>  
        <td>${item.stuName}</td>
        <td>${item.stuGender}</td>
        <td>${item.stuEmail}</td>
        <td>${item.stuAge}</td>
        <td>${item.stuTel}</td>
        <td>${item.stuAddr}</td>
        <td>
          <button data-id=${item.stuId} class="operationBtn editBtn">编辑</button>
          <button data-id=${item.stuId} class="operationBtn delBtn">删除</button>
        </td>
      </tr>
    `
  }).join(""); //将数组转变成字符串
  $('#stuTable').innerHTML += thead + '<tBody>' + tBody + '</tBody>';
}


/**
 * 渲染分页函数
 * @param {*} arr 所有数据
 */
function renderPager(arr) {
  $('#page').innerHTML = "";
  var center = ""; // center 就是用来存储中间生成的 li
  // 我们首先需要知道分页有多少页
  var totalPage = Math.ceil(arr.length / eachPage); // 总页码数
  // 接下来我们需要动态的生成中间的部分
  if (totalPage < 8) {
    // 我们就将所有的页码数渲染出来
    // 我们要做的事情就是生成中间的 li 的字符串，存入到 center
    center = createLi(center, 1, totalPage, curPage);
  } else {
    // 进入此 else 说明总页码数大于等于 8 页，需要省略号
    // 这里又分为 3 种情况，这 3 种情况是根据当前页码来决定的
    if (curPage <= 3) {
      // 说明当前页比较靠前，省略号偏后
      center = createLi(center, 1, 3, curPage);
      center += `....<li class="pageNum">${totalPage}</li>`
    } else if (curPage > totalPage - 3) {
      // 说明当前页比较靠后，省略号在前面
      center += `<li class="pageNum">1</li>....`;
      center = createLi(center, totalPage - 3, totalPage, curPage);
    } else {
      // 说明当前页码在中间，省略号需要拼接在两边
      center += `<li class="pageNum">1</li>....`;
      center = createLi(center, curPage - 2, curPage + 2, curPage);
      center += `....<li class="pageNum">${totalPage}</li>`
    }
  }
  // 最后一步，就是将所有的字符串填充到 div#page 里面
  $("#page").innerHTML = `
      <ul id="pageSelect" class="pagination">
          <li class="prevPage">&lt;</li>
          ${center}
          <li class="nextPage">&gt;</li>
      </ul>
  `
}

//接下来为整个分页设计点击事件
$('#page').onclick = function (e) {
  var e = e.target;
  if (e.classList.contains("prevPage")) {
    //点击的是上一页
    curPage--;
    if (!curPage) {
      curPage = 1;
      window.alert("当前已经是第一页");
      return;
    }
    renderContent(stuData);
  }
  if (e.classList.contains("nextPage")) {
    //点击的是下一页
    curPage++;
    var totalPage = Math.ceil(stuData.length / eachPage);
    if (curPage > totalPage) {
      curPage = totalPage;
      window.alert("当前已经是最后一页");
      return;
    }
    renderContent(stuData);
  }
  if (e.classList.contains("pageNum")) {
    //点击的是当前页
    curPage = parseInt(e.innerText);
    renderContent(stuData);
  }
}

//随机新增
$('#addStuRandom').onclick = function () {
  var newRandomStu = {
    "stuName": randomContent(lastName, 1) + (Math.random() > 0.5 ? randomContent(firstName, 1) : randomContent(firstName, 2)),
    "stuGender": Math.random() > 0.5 ? "男" : "女",
    "stuEmail": randomContent(numArr1, Math.floor(Math.random() * 2 + 8)) + '@qq.com',
    "stuAge": Math.floor(Math.random() * 11 + 20),
    "stuTel": 1 + randomContent(numArr, 10),
    "stuAddr": randomContent(cityName, 1)
  }
  newRandomStu.stuId = stuData[stuData.length - 1].stuId + 1;
  stuData.push(newRandomStu);
  //修改当前页码数，让当前页变为最后一页
  curPage = Math.ceil(stuData.length / eachPage);
  renderContent(stuData);//再渲染一下
}

//自定义新增
$('#addStuByForm').onclick = function () {
  goToAddStu();
}

$('#addStuBtn').onclick = function () {
  //1.获取表单内容
  // 数组里面存放用户填写的内容、
  var arr = [
    $('#stuName').value,
    $('.gender').checked ? "男" : "女",
    $('#stuEmail').value,
    $("#stuAge").value,
    $('#stuTel').value,
    $('#stuAddr').value,
  ]
  if (arr.every(function (item) {
    return item !== "";
  })) {
    // 进入此if，说明表单没空项
    //还需要进行正则判断
    var regArr = [...$$('.regValidate')];
    if (regArr.every(function (item) {
      return item.innerHTML === "";
    })) {
      // console.log("ok");
      // 说明进入此if，填写的数据可以提交
      var newStu = {
        //将每项数据填写到arr中
        "stuName": arr[0],
        "stuGender": arr[1],
        "stuEmail": arr[2],
        "stuAge": arr[3],
        "stuTel": arr[4],
        "stuAddr": arr[5],
      }
      //接下来判断是新增还是修改（编辑）
      if ($('#addStuBtn').value === "提交") {
        //新增按钮
        newStu.stuId = stuData[stuData.length - 1].stuId + 1;
        stuData.push(newStu);
        //修改当前页码数，让当前页变为最后一页
        curPage = Math.ceil(stuData.length / eachPage);
      } else {
        //编辑按钮
        newStu.stuId = editStuId;//前面保存的id为了将它赋给newStu.stuId
        //进行数据替换
        for (var i = 0; i < stuData.length; i++) {
          if (stuData[i].stuId === editStuId) {
            stuData.splice(i, 1, newStu);
            break;
          }
        }
      }
      renderContent(stuData); //重新渲染
      //因为每次新增后，新增学生页面还保留上次输入信息，所以需要将表单清空
      clearForm();//清空表单
      goToStuList();
    } else {
      window.alert("请按照要求填写每一项");
    }
  } else {
    window.alert("请按照要求填写每一项，您有空项未填");
  }
  // 2.验证表单

  // 3.组装一个新对象

  // 4.本项目的编辑与新增按钮用的是同一个表单，所以需要判断用户点击的是编辑还是新增，如果是新增，推入数组，重新渲染
}

//清空表单函数
function clearForm() {
  //清空表单
  $('#addStuForm').reset();//将form表单里元素的值清空
  //清空span
  var regArr = [...$$('.regValidate')];//拿到所有span
  // [...$$('.regValdate')];es6方法
  for (var i = 0; i < regArr.length; i++) {
    regArr[i].innerHTML = "";//便利这个数组让所有span的值为空
  }
  //重置提交按钮的文本
  $('#addStuBtn').value = "提交";
}


//表单返回按钮事件
$('#backStuList').onclick = function () {
  goToStuList();
}

// 编辑与删除
//绑定学生数据的table
$('#stuTable').onclick = function (e) {
  var e = e.target;
  if (e.classList.contains('editBtn')) {
    // 判断点击的是不是编辑这个按钮
    // 编辑
    goToAddStu(e.dataset.id);//拿到data-id
  }
  if (e.classList.contains('delBtn')) {
    //删除操作
    if (window.confirm("是否要删除该学生的数据")) {
      var id = e.dataset.id;
      for (var i = 0; i < stuData.length; i++) {
        if (stuData[i].stuId === parseInt(id)) {
          stuData.splice(i, 1);
          break;
        }
      }
      //重新获取totalPage
      var totalPage = Math.ceil(stuData.length / eachPage);
      if (curPage > totalPage) {
        curPage = totalPage;
      }
      renderContent(stuData);
    };
  }
}


//搜索功能
$('#searchBtn').onclick = function () {
  var searchType = $('#selectSearchItem').value;//搜索种类
  var searchContent = $('#searchStu').value;//搜索内容
  if (searchContent) {
    switch (searchType) {
      case "stuId": {
        //按照学号来搜索
        var filterData = stuData.filter(function (item) {
          return item.stuId === parseInt(searchContent);
        })
        break;
      }
      case "stuName": {
        //按照姓名来搜索
        var filterData = stuData.filter(function (item) {
          return item.stuName === searchContent;
        })
        break;
      }
    }
    curPage = 1;
    renderContent(filterData);
  } else {
    window.alert("请输入搜索内容");
  }
}

$("#backBtn").onclick = function () {
  $('#searchStu').value = "";
  renderContent(stuData);
}

//程序入口
function main() {
  //1.给左侧菜单绑定一个点击事件，点击之后可以做到单页切换
  //其实就是类名的切换
  changeItem();

  // 2.渲染初始数据
  // 正常来讲，数据应该从服务器获取，还未学服务器与网络通信，进行网络模拟
  renderContent(stuData);

}
main();