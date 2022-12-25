

function getJson(
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


    axios.get(url)
        .then(function (result) {
            var json_str = JSON.stringify(result.data);
            var json = 'Error'
            if (json_str) {
                var json = JSON.parse(json_str);
            }
            return json;
    });

    return url;
};
