
var resultScore = "";
var rate = "50%";
var shareContent = '';
var scoreid = 0;

function submitPhone() {
    var phone = $("#phoneText").val();
    if (phone.isMobile()) {
        $("#errorInfo").html("");
        submitSorce2(phone);
        $("#inputPhone").hide();
    }
    else {
        $("#errorInfo").html("请输入手机号!");
    }
}

function showResult() {
    $("#gameResult").show();
    //$('#sp_total1').html(total1);
    //$('#sp_total2').html(total2);
    //$('#sp_total3').html(total3);
    //$('#sp_total4').html(total4);
    //$('#sp_continuetotal').html(continuetotal);

    resultScore = score;

    if (parseInt(resultScore) <= 20) {
        $('#sp_content').html("经鉴定，你从来就没有过童年！");
        shareContent = "得分" + resultScore + "，" + era + "后的我没有过童年！"
    }
    else if (parseInt(resultScore) >= 21 && parseInt(resultScore) < 50) {
        $('#sp_content').html("小盆友，你有过童年吗！！！");
        shareContent = "得分" + resultScore + "，" + era + "后的我的童年让狗吃了"
    }
    else if (parseInt(resultScore) >= 51 && parseInt(resultScore) < 100) {
        $('#sp_content').html("你的童年很丰富！");
        shareContent = "得分" + resultScore + "，" + era + "后的我的童年很精彩！"
    }
    else if (parseInt(resultScore) >= 101 && parseInt(resultScore) < 150) {
        $('#sp_content').html("你的童年很完整！");
        shareContent = "得分" + resultScore + "，" + era + "后的我有个很完整的童年！"
    }
    else if (parseInt(resultScore) >= 151 && parseInt(resultScore) < 180) {
        $('#sp_content').html("经鉴定，你有个非常完美的童年！");
        shareContent = "得分" + resultScore + "，" + era + "后的我有个很完美的童年！"
    }
    else if (parseInt(resultScore) >= 181) {
        $('#sp_content').html("你的童年里除了吃喝玩乐还有别的吗？");
        shareContent = "得分" + resultScore + "，" + era + "后的我是在吃喝玩乐中长大的！"
    }

    $('#sp_score').html(resultScore);

    /*if (parseInt(resultScore) < 470) {
        //rate = Math.round(parseInt(resultScore) / 470 * 100) + "%";
        shareContent = "我在超级大脑中获得了" + resultScore + "分，你不服就来试试！";
    }
    else {
        shareContent = "我在超级大脑中获得了" + resultScore + "分，成为了超级大脑！";
    }*/


    window.shareData.imgUrl = "http://gameapi.luqinwenda.com/image/7080_result/" + ResultLogoArr[radNum];
    window.shareData.timeLineLink = "http://gameapi.luqinwenda.com/7080/";
    window.shareData.sendFriendLink = "http://gameapi.luqinwenda.com/7080/";
    window.shareData.weiboLink = "http://gameapi.luqinwenda.com/7080/"

    window.shareData.tTitle = shareContent;
    window.shareData.tContent = shareContent;
    window.shareData.fTitle = shareContent;
    window.shareData.fContent = shareContent;
    window.shareData.wContent = shareContent;

    submitSorce();
    
}

function submitSorce() {

    $.ajax({
        type: "GET",
        async: true,
        url: "http://gameapi.luqinwenda.com/score.aspx?season=7080&score=" + resultScore,
        success: function(data) {
            var jsonData = JSON.parse(data);
            if (parseInt(resultScore) >= 160 && parseInt(jsonData.great_than_150_num) < 10) {
                $("#inputPhone").show();
                scoreid = jsonData.id;
            }
        }
    });
}

function submitSorce2(phone) {
    $.ajax({
        type: "GET",
        async: true,
        url: "http://gameapi.luqinwenda.com/update_info.aspx?id=" + scoreid + "&phone=" + phone,
        success: function(data) {
            $("#inputPhone").hide();
        }
    });
}

function shareBtn() {
    $("#showShare").show();
}

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.shareData = {
        "imgUrl": "http://gameapi.luqinwenda.com/image/7080_result/" + ResultLogoArr[radNum],
        "timeLineLink": "http://gameapi.luqinwenda.com/7080/",
        "sendFriendLink": "http://gameapi.luqinwenda.com/7080/",
        "weiboLink": "http://gameapi.luqinwenda.com/7080/",
        "tTitle": shareContent,
        "tContent": shareContent,
        "fTitle": shareContent,
        "fContent": shareContent,
        "wContent": shareContent
    };

    // 发送给好友 
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl, // 
            "img_width": "640", // 
            "img_height": "640",
            "link": window.shareData.sendFriendLink,
            "desc": window.shareData.fContent,
            "title": window.shareData.fTitle
        }, function(res) {
            _report('send_msg', res.err_msg);
        });
    });

    // 分享到朋友圈 
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function(res) {
            _report('timeline', res.err_msg);
        });
    });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        WeixinJSBridge.invoke('shareWeibo', {
            "content": window.shareData.wContent,
            "url": window.shareData.weiboLink
        }, function(res) {
            _report('weibo', res.err_msg);
        });
    });
}, false)


function viewProfile() {
    typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke && WeixinJSBridge.invoke("profile", {
        username: 'gh_4309156ee263',
        scene: "57"
    });
}
