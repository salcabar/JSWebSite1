
var resultScore = "";
var rate = "50%";
var shareContent = '';

function showResult() {
    $("#gameResult").show();
    $('#sp_total1').html(total1);
    $('#sp_total2').html(total2);
    $('#sp_total3').html(total3);
    $('#sp_total4').html(total4);
    //$('#sp_continuetotal').html(continuetotal);
    resultScore = score;

    if (parseInt(resultScore) <= 20) {
        $('#sp_content').html("你已经很棒了，再接再励！");
    }
    else if (parseInt(resultScore) >= 21 && parseInt(resultScore) < 50) {
        $('#sp_content').html("你就是天才，智商超过常人！");
    }
    else if (parseInt(resultScore) >= 51 && parseInt(resultScore) < 100) {
        $('#sp_content').html("你的智力可以和爱因斯坦持平了！");
    }
    else if (parseInt(resultScore) >= 101 && parseInt(resultScore) < 150) {
        $('#sp_content').html("你是当之无愧的最强大脑！");
    }
    else if (parseInt(resultScore) >= 151 && parseInt(resultScore) < 200) {
        $('#sp_content').html("你的大脑已达到巅峰，无人能超越！");
    }

    $('#sp_score').html(resultScore);

    if (parseInt(resultScore) < 470) {
        //rate = Math.round(parseInt(resultScore) / 470 * 100) + "%";
        //shareContent = "我在超级大脑第二季中获得了" + resultScore + "分，击败了" + rate + "的人，你不服就来试试！";
        shareContent = "我在超级大脑第二季中获得了" + resultScore + "分，你不服就来试试！";
    }
    else {
        //shareContent = "我在超级大脑第二季中获得了" + resultScore + "分，击败了100%的人，成为了超级大脑！";
        shareContent = "我在超级大脑第二季中获得了" + resultScore + "分，成为了超级大脑！";
    }

    $.ajax({
        type: "GET",
        async: true,
        url: "http://gameapi.luqinwenda.com/score.aspx?season=2&score=" + resultScore,
        success: function(data) {
            //var jsonData = JSON.parse(data);
            //rate = Math.round(jsonData.rate * 100).toString() + "%";
        }
    });

    window.shareData.imgUrl = "http://gameapi.luqinwenda.com/image/start2.jpg";
    window.shareData.timeLineLink = "http://gameapi.luqinwenda.com/season2/";
    window.shareData.sendFriendLink = "http://gameapi.luqinwenda.com/season2/";
    window.shareData.weiboLink = "http://gameapi.luqinwenda.com/season2/"

    window.shareData.tTitle = shareContent;
    window.shareData.tContent = shareContent;
    window.shareData.fTitle = shareContent;
    window.shareData.fContent = shareContent;
    window.shareData.wContent = shareContent;
    
}

function shareBtn() {
    $("#showShare").show();
}

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.shareData = {
        "imgUrl": "http://gameapi.luqinwenda.com/image/start2.jpg",
        "timeLineLink": "http://gameapi.luqinwenda.com/season2/",
        "sendFriendLink": "http://gameapi.luqinwenda.com/season2/",
        "weiboLink": "http://gameapi.luqinwenda.com/season2/",
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
