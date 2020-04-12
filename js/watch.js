// タイマーウォッチ

var status = 0; // 0:停止中 1:動作中
var time = 0;
var startBtn = document.getElementById("startBtn");
var timerLabel = document.getElementById('timerLabel');

// STARTボタン
function start() {
    // 動作中にする
    status = 1;
    // スタートボタンを押せないようにする
    startBtn.disabled = true;

    timer();
}

// STOPボタン
function stop() {
    // 停止中にする
    status = 0;
    // スタートボタンを押せるようにする
    startBtn.disabled = false;
}


// STOPを押したときに出るアラートメッセージ  
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  
function stop() {
    var pmsg = confirm('コストを表示させますか？');

    if (pmsg == true) {
        // OKなら移動
        window.location.href = "https://www.google.com/";
    }
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


function timer() {
    // ステータスが動作中の場合のみ実行
    if (status == 1) {
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

document.onkeydown = function (event) {
    if (event) {
        if (event.keyCode == 32 || event.which == 32) {
            if (status == 1) {
                stop();
            } else if (status == 0) {
                start();
            }
        }
    }
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