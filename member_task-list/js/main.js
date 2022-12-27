function getUrl(type){
  var url = 'https://zyzx-s.zy.com/api/1/aipt/get_like_tasks?pageNo=1&pageSize=10&access_token=6ff9dd8c-dcbf-414f-8a02-6c693de20b7e'
}

function getExamUrl(
  pageNo = 1,
  pageSize = 10,
  finished = false,
  access_token = ""
){
  var url = `https://zyzx-s.zy.com/api/1/aipt/get_tasks?\
pageNo=${pageNo}\
&pageSize=${pageSize}\
&finished=${finished}\
&access_token=${access_token}`;
return url
}
async function getJson(
url
) {


let data = await axios.get(url)
.then(function (result) {
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
};

function addTask(json,id='Chinese', a){
    for (var i = 0; i < json.data.list.length; i++) {
        var point = '&nbsp;&bull;&nbsp;'
        var str = `<span class="badge bg-warning">${json.data.list[i]['subject_name']}</span> ` +
         '</br>' +point+
          json.data.list[i].task_name +
           '<br>&nbsp;&bull;&nbsp;发布日期: ' +
            json.data.list[i]['publish_time'] +
             '<br>&nbsp;&bull;&nbsp;截止日期: ' +
              json.data.list[i].deadline + "<br>"+
              // '&nbsp;&bull;&nbsp;教师备注: ' +
              // json.data.list[i].remarks + "<br>"+
              `<span class="badge bg-secondary">${json.data.list[i]['res_type_name']}</span> `+
              `<span class="badge bg-secondary">${json.data.list[i]['exercise_type_name']}</span>`+
              "<br>";
        var exam_url = json.data.list[i]['resource_list'][0]['resource_preview_url'];


        var task = document.createElement("li");
        // mb-3
        task.className = "list-group list-group-item list-group-item-action list-group-item-success";
        task.setAttribute('onclick', `location.href='${exam_url}'`);
        task.setAttribute('style', "cursor:pointer");
        // task.href = exam_url;
        task.innerHTML = str;
        var div = document.getElementById(id);
        //         console.log(json.data.list[i]['subject_name']);

        var card_body = div.getElementsByClassName('card-body');
        card_body[0].appendChild(task);

        // 不同作业末尾换行
        var brDiv = document.createElement('br');
        card_body[0].appendChild(brDiv);


    }
}