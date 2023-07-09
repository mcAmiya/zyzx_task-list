function getUrl(type) {
  var url =
    "https://zyzx-s.zy.com/api/1/aipt/get_like_tasks?pageNo=1&pageSize=10&access_token=6ff9dd8c-dcbf-414f-8a02-6c693de20b7e";
}

function getExamUrl(
  pageNo = 1,
  pageSize = 10,
  finished = false,
  access_token = ""
) {
  var url = `https://zyzx-s.zy.com/api/1/aipt/get_tasks?\
pageNo=${pageNo}\
&pageSize=${pageSize}\
&finished=${finished}\
&access_token=${access_token}`;
  return url;
}
async function getJson(url) {
  let data = await axios
    .get(url)
    .then((result) => {
      var json_str = JSON.stringify(result.data);

      if (json_str) {
        var json = JSON.parse(json_str);
      }
      // console.log(json);
      return json;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
}


function copyToUser(content) {
  // 复制内容到粘贴板
  var copy = function (e) {
  e.preventDefault();
  console.log(`已复制内容: ${content}`);
  // alert("信息已复制")
  var text = content
  if (e.clipboardData) {
  e.clipboardData.setData('text/plain', text);
  } else if (window.clipboardData) {
  window.clipboardData.setData('Text', text);
  }
  }
  window.addEventListener('copy', copy);
  document.execCommand('copy');
  window.removeEventListener('copy', copy);
  }



function addTask(json, status="Undone", a) {
  for (var i = 0; i < json.data.list.length; i++) {
    var subject = `<span class="badge bg-warning">${json.data.list[i]["subject_name"]}</span> `;
    var point = "&nbsp;&bull;&nbsp;";
    var is_new = (json.data.list[i]["is_new"]) ? `<span class="badge bg-danger" style="float: right">新</span>` : '';
    var dead_line = (json.data.list[i].deadline != null) ? json.data.list[i].deadline : '无截至时间';
    var tag_homework = (json.data.list[i]["exercise_type_name"] != null) ? `<span class="badge bg-secondary">${json.data.list[i]["exercise_type_name"]}</span>` : '';
    
    var homework_info = (json.data.list[i]["res_type_name"] == "资料") ? `<span class="badge bg-primary" id="hw_info" onclick="copyToUser('任务id:${json.data.list[i]['task_id']}\\r\\文件名称:${json.data.list[i]['resource_list'][0]['resource_name']}\\r\\nURL:${json.data.list[i]['resource_list'][0]['attachment_url']}')" style="float:right">作业信息</span>` : '';

    var str =
    "<div id='hw_card' onclick=''>" +  
    subject +
      is_new +
      "<br>" +
      "<div id='hw_text'>" +
      point +
      `<span>${json.data.list[i].task_name}</span>` +

      "<br>"+
      point +
      json.data.list[i]["publish_time"] +
      " -> " +
      dead_line +
      "<br>" +
      "</div>" +
      // '&nbsp;&bull;&nbsp;教师备注: ' +
      // json.data.list[i].remarks + "<br>"+
      `<span class="badge bg-secondary">${json.data.list[i]["res_type_name"]}</span> ` +
      // `<span class="badge bg-secondary">${json.data.list[i]["exercise_type_name"]}</span> ` +
      tag_homework +
      homework_info +
      // `<button type="button" class="btn btn-primary btn-sm" @click="likeTask('${json.data.list[i]["task_id"]}')">收藏</button>`
      "</div>";
    var exam_url =
      json.data.list[i]["resource_list"][0]["resource_preview_url"];

    var task = document.createElement("li");
    // mb-3
    task.className =
      "list-group list-group-item list-group-item-action list-group-item-success";
    
    // task.setAttribute("onclick", `location.href='${exam_url}'`);
    task.setAttribute("style", "cursor:pointer");
    // task.href = exam_url;
    task.innerHTML = str;
    
    // 分类投放
    var id = json.data.list[i]["subject_name"]
    // id = id.replace('语文', status+'_Chinese');
    // id = id.replace('数学', status+'_Math');
    // id = id.replace('英语', status+'_English');
    // id = id.replace('物理', status+'_Physics');
    // id = id.replace('化学', status+'_Chemistry');
    // id = id.replace('政治', status+'_Politics');
    // id = id.replace('历史', status+'_History');
    id = status+'_All';
    // console.log(id)
    
    var div = document.getElementById(id);
    //         console.log(json.data.list[i]['subject_name']);

    var card_body = div.getElementsByClassName("card-body");
    card_body[0].appendChild(task);

    // 不同作业末尾换行
    var brDiv = document.createElement("br");
    card_body[0].appendChild(brDiv);
    document.getElementById("hw_text").setAttribute("onclick", `location.href='${exam_url}'`);
  }
}

async function likeTask(access_token, taskId, like = true) {
  var url = `https://zyzx-s.zy.com/api/1/aipt/like_task?access_token=${access_token}`;
  var bodyFormData = {
    taskId: taskId,
    like: like,
  };
  axios({
    method: "post",
    url: url,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

async function finishTask(access_token, taskId,) {
  var url = `https://zyzx-s.zy.com/api/1/aipt/finish_task`
  var bodyFormData = 'taskId='+taskId;
  axios({
    method: "post",
    url: url,
    data: bodyFormData,
    headers: { 
      "Content-Type": "multipart/form-data",
      'Zyzx-token': access_token
    
    },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

function finish_amiya_task() {
  var Amiya_Token = '6ff9dd8c-dcbf-414f-8a02-6c693de20b7e'
  getJson(getExamUrl(1, 50, false, Amiya_Token)).then((json) => {
    // console.log(json.data.list);
    // console.log(Amiya_Token)

    for (i = 0; i < json.data.list.length; i++) {
        task_id = json.data.list[i].task_id;
        console.log(task_id)
    finishTask(Amiya_Token, task_id)
    }
});
}