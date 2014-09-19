﻿var questionNO = 0;
var showTag = 1;
var score = 0;
var answer = "";
var continueAll = 0;
var continue1 = 0;
var continue2 = 0;
var continue3 = 0;
var QAJson = null;
var QAJsonArr = null;

var continueTotal = 0;
var total1 = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;
/*
var QAJsonStr = [{
"id": "111111",
"prompt": ["提示1", "提示2", "提示3", "提示4"],
"answercount": "2",
"answer": "足球",
"options": ["提", "提", "提", "提", "提", "提", "足", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]
}, {
"id": "222222",
"prompt": ["提示11", "提示12", "提示13", "提示14"],
"answercount": "3",
"answer": "篮球的",
"options": ["足", "篮", "提", "提", "提", "提", "足", "球", "提", "的", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "提", "球", "提", "提"]}];
*/

$(document).ready(function() {
    if (!browserRedirect()) {
        document.write('暂不支持当前版本');
        document.close();
        return false;
    }
    $.ajax({
        type: "GET",
        async: false,
        url: "http://gameapi.luqinwenda.com/guess.aspx?season=4",
        success: function(data) {
            var jsonData = JSON.parse(data);
            var gameData = jsonData.game;
            QAJsonArr = gameData.questions;
        }
    });

    //初始化数据
    //QAJsonArr = eval(QAJsonStr);
    QAJson = QAJsonArr[questionNO];
    fillData(QAJson);



    //提示
    $('.next_btn').click(function() {
        if (showTag <= QAJson.prompt.length) {
            $('#PromptRightLi a').eq(showTag).css("background", "#FFEA01");
            $('#PromptRightLi a').eq(showTag).html(QAJson.prompt[showTag]);
            showTag++;
        }
    });

});

//确定/跳过
function submitBtn() {
    $("#btnSubmit").unbind("click");
    $("#btnSubmit").css("color", "#999");
    var inputVal = '';
    $('.grid a').each(function() {
        inputVal += $(this).html();
    });

    if (inputVal == answer) {
        showInfo("<span style='color:#009933'>恭喜你,回答正确</span>");
        var AddCountScore = 0;  //countScoreFun(showTag);
        switch (showTag) {
            case 1:
                var cc = AddCountScore + 20;
                $('#addScore').html("+" + cc);
                score += cc;
                continue1++;
                total1++;
                break;
            case 2:
                var cc = AddCountScore + 10;
                $('#addScore').html("+" + cc);
                score += cc;
                continue2++;
                total2++;
                break;
            case 3:
                var cc = AddCountScore + 5;
                $('#addScore').html("+" + cc);
                score += cc;
                continue3++;
                total3++;
                break;
            default:
                var cc = AddCountScore + 2;
                $('#addScore').html("+" + cc);
                score += cc;
                total4++;
                break;
        }
        continueAll++;
        $('#addScore').css('display', 'block');
        $('#addScore').animate({
            top: '3px'
        }, "normal");
        $("#addScore").fadeOut(500, function() {
            $('#addScore').css('top', '30px');
            $("#scoreVal").html(parseInt($("#scoreVal").html()) + parseInt($('#addScore').html().substring(1)));
        });
        if (questionNO == 9 && continueTotal < continueAll) {
            continueTotal = continueAll;
        }
    }
    else {
        if (continueTotal < continueAll)
            continueTotal = continueAll;
        continueAll = 0;
        continue1 = 0;
        continue2 = 0;
        continue3 = 0;
        showInfo("<span style='color:#990000'>很遗憾,回答错误</span>");
    }
    questionNO++;
    for (var i = 0; i < QAJson.prompt.length; i++) {
        $('#PromptRightLi a').eq(i).css("background", "#FFEA01");
        $('#PromptRightLi a').eq(i).html(QAJson.prompt[i]);
    }
    
    if (questionNO < QAJsonArr.length) {
        QAJson = QAJsonArr[questionNO];
        setTimeout('fillData(QAJson);', 2000);
    }
    else {
        setTimeout('showResult();', 2000);
    }
}
function jumpResult() {
    location.href = "result.htm?score=" + score + "&continuetotal=" + continueTotal + "&total1=" + total1 + "&total2=" + total2 + "&total3=" + total3 + "&total4=" + total4;
}

function countScoreFun(showTag) {
    var addScore = 0;
    if (questionNO > 0) {
        switch (showTag) {
            case 1:
                if (continue1 > 0)
                    addScore = (continue1 * 5);
                break;
            case 2:
                if (continue2 > 0)
                    addScore = (continue2 * 3);
                break;
            case 3:
                if (continue3 > 0)
                    addScore = (continue3 * 1);
                break;
        }
        if (continueAll > 0)
            addScore += (continueAll * 1);
    }
    return addScore;
}


//填充数据
function fillData(QAJson) {
    //alert(QAJson);
    $("#btnSubmit").bind('click', submitBtn);
    $("#btnSubmit").css("color", "#fff");
    var i = 0;
    showTag = 1;
    answer = QAJson.answer;
    $("#QANum").html(QAJson.id);
    $("#currentNum").html(questionNO+1);
    $('#PromptRightLi a').each(function() {
        $(this).html(QAJson.prompt[i]);
        if (i > 0) {
            $(this).html("　　　　");
            $(this).css("background", "#676767")
        }
        i++;
    });
    var inputGrid = '';
    for (i = 0; i < QAJson.answercount; i++) {
        inputGrid += "<a onclick='delAnswer(this);'>　</a>";
    }
    $('.input_grid div').eq(0).html(inputGrid);
    var changeGrid = '';
    for (i = 0; i < QAJson.options.length; i++) {
        changeGrid += "<a id='change_" + i + "' onclick=\"changeAnswer(this);\" data=" + i + " ischange='0'>" + QAJson.options[i] + "</a>";
        if (i > 0 && (i + 1) % 8 == 0)
            changeGrid += "<br />";
    }
    $('.change_grid').html(changeGrid);
    changeButton();
}

//选择答案
function changeAnswer(changeObj) {
    var obj = $(changeObj);
    var changeVal = obj.html();
    if (obj.attr('ischange') == "0") {
        $('.grid a').each(function() {
            if ($(this).html() == '' || $(this).html() == '　') {
                $(this).html(changeVal);
                $(this).attr('data', obj.attr('data'));
                $(this).bind('click', function() {
                    delAnswer(this);
                });
                obj.css('background', '#676767');
                obj.css('color', '#fff');
                obj.attr('ischange', '1');
                return false;
            }
        });
    }
    else {
        //取消选择
        obj.css('background', '#fff');
        obj.css('color', '#000');
        obj.attr('ischange', '0');
        $('.grid a').each(function() {
            if ($(this).attr('data') == $(obj).attr('data')) {
                $(this).html("　");
                $(this).removeAttr('data');
                //$(this).removeAttr('onclick');
                return false;
            }
        });
    }
    changeButton();
}

//删除答案
function delAnswer(obj) {
    if ($(obj).html() != '' && $(obj).html() != '　' && $(obj).attr('data')) {
        $('.change_grid a').each(function() {
            if ($(this).attr('data') == $(obj).attr('data')) {
                $(this).css('background', '#fff');
                $(this).css('color', '#000');
                $(this).attr('ischange', '0');
                return false;
            }
        });
        $(obj).html('　');
        $(obj).removeAttr('data');
    }
    changeButton();
}
//提交按钮改变
function changeButton() {
    var isfull = 1;
    $('.grid a').each(function() {
        if ($(this).html() == '' || $(this).html() == '　')
            isfull = 0;
    });

    if (isfull == 1) {
        $("#btnSubmit").css('background', '#990000');
        $("#btnSubmit").css('border', '1px solid #990000');
        $("#btnSubmit").html("确认");
    }
    else {
        $("#btnSubmit").css('background', '#676767');
        $("#btnSubmit").css('border', '1px solid #676767');
        $("#btnSubmit").html("跳过");
    }
}

//加分效果
function showInfo(info) {
    $('.openInfo a').eq(0).html(info);
    $('.openInfo').fadeIn(1000);
    $('.openInfo').fadeOut(1000);
}



