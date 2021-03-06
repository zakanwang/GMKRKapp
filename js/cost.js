function getUrlVars() {

  //現在時刻
  var vars = [];
  var hash = "";
  var array = "";
  var url = window.location.search;

  hash = url.slice(1).split('&');
  array = hash[0].split('=');
  vars.push(array[1]);
  vars.push(array[2]);
  vars.push(array[3])

  var amount_time = vars[0];
  var h = Math.floor(Math.floor(amount_time / 1000 / 60) / 60);
  var m = Math.floor(amount_time / 1000 / 60) % 60;
  var s = Math.floor(amount_time / 1000) % 60;
  console.log(h);
  
  //コスト
  var amount_cost = Math.round(amount_time / 3600000 * vars[1] * vars[2]);

  //終了時刻
  var today = new Date();
  var h1 = today.getHours();
  var m1 = today.getMinutes();
  var s1 = today.getSeconds();

  //開始時間の計算
  var startHour = calculateStarttime(h1, h, 'hour');
  var startMin = calculateStarttime(m1, m, 'minute');
  var startSec = calculateStarttime(s1, s, 'second');

  //表示
  var message = document.getElementById('output_message').innerHTML = `<b>経過時間:${h}時間 ${m}分 ${s}秒</b>`
  // var message = document.getElementById('output_message').innerHTML = `<b>経過時間:${amount_time}時間 </b>`
  var peoples = document.getElementById('peoples').innerHTML = `<b>人数:${vars[1]} </b>`
  var per_cost = document.getElementById('per_cost').innerHTML = `<b>一人あたりのコスト:${vars[2]} 円/時間</b>`
  var result = document.getElementById('result').innerHTML = `<b>今回の会議のコストは:${amount_cost}円 だぜ！！</b>`
  var thisDate = document.getElementById('thisdate').innerHTML =
    `開始時間：${startHour}:${startMin}:${startSec}，終了時間:${checkTime(h1)}:${checkTime(m1)}:${checkTime(s1)}</b>`;

  return vars;
}

//padding 1⇒01  // 当数字是小于10的就要在前面加0.看起来规范
function checkTime(i) {
  if (i < 10) { i = "0" + i }
  return i
};

function calculateStarttime(t1, t, flg) {
  if (flg == 'hour') {
    //時間の計算
    if (t1 > t) {
      return checkTime(t1 - t);
    } else {
      return checkTime((t1 + 24) - t);
    }
  } else {
    //分、秒の計算
    if (t1 > t) {
      return checkTime(t1 - t);
    } else {
      return checkTime((t1 + 60) - t);
    }
  }
}

getUrlVars();
