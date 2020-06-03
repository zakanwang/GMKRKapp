let elapsedTime = 0;
let amountCost = 0;
let h = 0;
let m = 0;
let s = 0;
document.getElementById('stop').disabled = true;

$(function () {
    var oPeople = document.getElementById('peoples');
    var oMoney = document.getElementById('money');
    var oBtn = document.getElementById('stop');
    function isnull(val1, val2) {
        var str1 = val1.replace(/(^\s*)|(\s*$)/g, '');//spaceを消す
        var str2 = val2.replace(/(^\s*)|(\s*$)/g, '');
        if (str1, str2 == '' || str1, str2 == undefined || str1, str2 == null
            || str1 < 1 || str1 > 99 || str2 < 790 || str2 > 10000 ) {
            alert("人数または金額が不正です。");
        } else{
            $("#div3").dialog({
                modal: true, //モーダル表示
                title: "会議終わっちゃう？", //タイトル
                buttons: { //ボタン
                    "Yes!": function () {
                        var param_time = elapsedTime;
                        // console.log(param_time);
                        
                        // console.log(h);
                        // console.log(m);
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

(function () {
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入

    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');
    var restart = document.getElementById('')

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
        var ms = elapsedTime % 1000;

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
        //start.disabled = true;
        // startBtn();

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
            start.value = "START"
        }
    });

    stop.addEventListener('click', function () {
        clearTimeout(timerId);

        timeToadd += Date.now() - startTime;
        start.value = "START"

    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener('click', function () {
        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();
    });
})();

function createCookie() {
    //cookieの保持期限を設定
    //nullの場合には、セッション終了まで有効。
    var days = null;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    };
    //cookieを書きこむ
    document.cookie = "hensu" + "=" + 100 + expires + "; path=/";
};

//cookieを読み込む
function readCookie() {
    //cookieのhensuの値を返す
    var name = "hensu" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        };
    };
    return null;
};

function peoplesBlur() {
    var peoples = document.getElementById("peoples").value;
    if (peoples < 1 || 99 < peoples) {
        document.getElementById("peoplesErr").innerHTML = "人数は1~99の値を入力してください";
    } else {
        document.getElementById("peoplesErr").innerHTML = "";
    }
};

function moneyBlur() {
    var money = document.getElementById("money").value;
    if (money < 790 || 10000 < money) {
        document.getElementById("moneyErr").innerHTML = "1時間のコストは790~10000の値を入力してください";
    } else {
        document.getElementById("moneyErr").innerHTML = "";
    }
};