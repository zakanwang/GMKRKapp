'use strict';

let elapsedTime = 0;

//ロード処理
window.onload = function () {
    document.getElementById('stop').disabled = true;
};

//ポップアップ関連
$(function () {
    var oPeople = document.getElementById('peoples');
    var oMoney = document.getElementById('money');
    var oBtn = document.getElementById('stop');

    function isnull(val1, val2) {
        //spaceを消す
        var str1 = val1.replace(/(^\s*)|(\s*$)/g, '');
        var str2 = val2.replace(/(^\s*)|(\s*$)/g, '');
        if (str1, str2 == '' || str1, str2 == undefined || str1, str2 == null
            || str1 < 1 || str1 > 99 || str2 < 790 || str2 > 10000) {
            alert("人数または金額が不正です。");
        } else {
            $("#div3").dialog({
                modal: true, 
                title: "会議終わっちゃう？", 
                buttons: { 
                    "Yes!": function () {
                        var param_time = elapsedTime;
                        //ここで人数とひとりあたコストの値を取得して、パラメータを生成している
                        var peoples = document.getElementById("peoples").value;
                        var per_cost = document.getElementById("money").value;
                        window.location.href = "./cost.html?param=" + param_time + "=" + peoples + "=" + per_cost;
                    },
                    "まだ続ける": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    }
    oBtn.onclick = function () {
        isnull(oPeople.value, oMoney.value);
    };
});

//タイマーの表示
$(function () {
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    //クリック時の時間を保持するための変数定義
    var startTime;
    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;
    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;

    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText() {
        var h = Math.floor(Math.floor(elapsedTime / 1000 / 60) / 60);
        var m = Math.floor(elapsedTime / 1000 / 60) % 60;
        var s = Math.floor(elapsedTime / 1000) % 60;

        var peoples = document.getElementById("peoples").value;
        var per_cost = document.getElementById("money").value;
        var ByoCount = s + m * 60 + h * 60 * 60;
        var money = Math.floor(peoples * per_cost / 60 / 60 * ByoCount);

        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s
        }
        if (peoples, per_cost == '' || peoples, per_cost == undefined || peoples, per_cost == null
            || peoples < 1 || peoples > 99 || per_cost < 790 || per_cost > 10000) {
            money = 0;
        }

        //timer.textContent = h + ':' + m + ':' + s;
        document.getElementById("timer").innerHTML = "<span id='timer2'>" + h + ':' + m + ':' + s + "</span>";
        document.getElementById("realTimeCost").innerHTML = "現在の会議コスト：" + "<span id='money2'>" + money + "</span>円";
    }

    //再帰的に使える用の関数
    function countUp() {
        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function () {
            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText();

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

            //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        }, 10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start.addEventListener('click', function () {
        //STARTボタンの値によって条件分岐をさせる。
        if (start.value == "START") {
            document.getElementById('stop').disabled = false;

            //在時刻を示すDate.nowを代入
            startTime = Date.now();

            //再帰的に使えるように関数を作る
            countUp();
            start.value = "PAUSE";

            //STARTボタンの値がPAUSEの場合は、時間よ止まれ-The world。
        } else if (start.value == "PAUSE") {
            clearTimeout(timerId);

            timeToadd += Date.now() - startTime;
            start.value = "START";
        }
    });

    stop.addEventListener('click', function () {
        clearTimeout(timerId);

        timeToadd += Date.now() - startTime;
        start.value = "START";
    });
});

//人数のエラー処理
function peoplesBlur() {
    var peoples = document.getElementById("peoples").value;
    if (peoples < 1 || 99 < peoples) {
        document.getElementById("peoplesErr").innerHTML = "人数は1~99の値を入力してください";
    } else {
        document.getElementById("peoplesErr").innerHTML = "";
    }
};

//コストのエラー処理
function moneyBlur() {
    var money = document.getElementById("money").value;
    if (money < 790 || 10000 < money) {
        document.getElementById("moneyErr").innerHTML = "1時間のコストは790~10000の値を入力してください";
    } else {
        document.getElementById("moneyErr").innerHTML = "";
    }
};