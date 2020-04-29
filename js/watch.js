let elapsedTime = 0;
let amountCost = 0;

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

    //経過時刻を更新するための変数。 初めはだから0で初期化
    // var elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText() {

        var h = Math.floor(elapsedTime / 60000 / 60);

        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        var m = Math.floor(elapsedTime % 3600000 / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        var ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        h = ('0' + h).slice(-1);
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = h + ':' + m + ':' + s;
    }

    //ボタン表示変更の関数
    // function startBtn() {
    //     const start = document.getElementById("start");
    //     const value1 = start.value;
    //     var temporary_time = elapsedTime;

    //     if (value1 == "START" && elapsedTime==0) {
    //         start.value = "PAUSE";

    //     } else if(value1 == "START" && elapsedTime!=0) {
    //         start.value = "PAUSE";
    //         clearTimeout(timerId);
    //         timeToadd += Date.now() - startTime;

    //     }else {
    //         start.value = "START";

    //     }
        
    // }


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
        if (start.value == "START"){

        //在時刻を示すDate.nowを代入
        startTime = Date.now();
        

        //再帰的に使えるように関数を作る
        
        countUp();
        start.value = "PAUSE";

        //STARTボタンの値がPAUSEの場合は、時間よ止まれ-The world。
        }else if (start.value =="PAUSE"){
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




// function popupImage() {
//     var popup = document.getElementById('js-popup');
//     if (!popup) return;

//     var blackBg = document.getElementById('js-black-bg');

//     var blackBg = document.getElementById('js-black-bg');
//     var closeBtn = document.getElementById('js-close-btn');
//     var showBtn = document.getElementById('yes');

//     closePopUp(blackBg);
//     closePopUp(closeBtn);
//     closePopUp(showBtn);
//     function closePopUp(elem) {
//         if (!elem) return;
//         elem.addEventListener('click', function () {
//             popup.classList.toggle('is-show');
//         });
//     }
// }




// コスト計算

// function calculate() {
//     var peoples = document.getElementById("peoples").value;
//     var money = document.getElementById("money").value;
//     var amaoutTime = elapsedTime / 360000;
//     var amountCost = Math.round(peoples * money * amaoutTime);

//     cost = "今回の会議のコストは" + amountCost + "円だぜ！！";
//     // document.getElementById("output_message").innerHTML = cost;

// };




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



