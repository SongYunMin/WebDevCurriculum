class Ajax{
    constructor() {
    }

    ajaxRequest(url, dataType, type, data){
        console.log(data);
        $.ajax({
            url: `${url}`,
            dataType: `${dataType}`,
            type: `${type}`,
            data: `${data}`,
            success: function (result) {
                if (result === 'ok') {
                    alert("성공적으로 저장되었습니다.");
                }
            }
        });
    }
}