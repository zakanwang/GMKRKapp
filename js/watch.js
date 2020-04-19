
// 定数
// const STOP_FLG = 0;
// const START_FLG = 1;

var Status = 0; // 0:停止中 1:動作中
var time = 0;
var startBtn = document.getElementById("startBtn");
var timerLabel = document.getElementById('timerLabel');

// STARTボタン
function start() {
    // 動作中にする
    // Status = START_FLG;
    Status = 1;
    // スタートボタンを押せないようにする
    startBtn.disabled = true;

    timer();
}


function stop() {
    // 停止中にする
    status = 0;
    // スタートボタンを押せるようにする
    startBtn.disabled = false;
    var AlertMsg = confirm('コストを表示させますか？');
    if (AlertMsg == true) {
        status = 0;

        
    }
}



// var stop = document.getElementById('js-show-popup"');

// js-show-popup.addEventListener('click', function(){
// //     var result = window.confirm('コストを表示させますか？');

// //     if (result){
// //         popupImage();
// //     }
// // });


function timer() {
    // ステータスが動作中の場合のみ実行
    if (Status == 1) {
        setTimeout(function () {
            time++;

            // 分・秒・ミリ秒を計算
            var hour = Math.floor(time / 100 / 60 / 60);
            var min = Math.floor(time / 100 / 60);
            var sec = Math.floor(time / 100);
            var mSec = time % 100;


            // 分が６０分以上の場合 例）89分→29分にする
            if (min >= 60) min = min % 60;

            // 分が１桁の場合は、先頭に０をつける
            if (min < 10) min = "0" + min;

            // 秒が６０秒以上の場合　例）89秒→29秒にする
            if (sec >= 60) sec = sec % 60;

            // 秒が１桁の場合は、先頭に０をつける
            if (sec < 10) sec = "0" + sec;




            // タイマーラベルを更新
            timerLabel.innerHTML = hour + ":" + min + ":" + sec;

            // 再びtimer()を呼び出す
            timer();
        }, 10);
    }
}







function calculate() { // コスト計算
    var peoples = document.getElementById("peoples").value;
    var money = document.getElementById("money").value;
    var amaoutTime = time/360000;
    var amountCost = Math.round(peoples * money * amaoutTime);
    
    cost = "今回の会議のコストは" + amountCost +  "円だぜ！！";
    document.getElementById("output_message").innerHTML = cost;

};

function popupImage() {
    var popup = document.getElementById('js-popup');
    if (!popup) return;

    var blackBg = document.getElementById('js-black-bg');

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    function closePopUp(elem) {
        if (!elem) return;
        elem.addEventListener('click', function () {
        popup.classList.toggle('is-show');
        
            
        });
    }
}
popupImage();
