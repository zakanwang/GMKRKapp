var val = getUrlVars();
var vars = 0;
var message = "";
var peoples = "";
var per_cost = "";

function getUrlVars(){

  var vars = [] , max = 0, hash = "" , array = "";
  var url = window.location.search;

  hash = url.slice(1).split('&');
  // console.log(hash);
  max = hash.length;
  // console.log(max);
  

  for (var i = 0; i < max; i ++){
    array = hash[i].split('=');
    vars.push(array[1]);
    vars.push(array[2]);
    vars.push(array[3])
  //  vars[array[0]] = array[1];
  }

  // パラメーターが取得できているか確認
  console.log("58行目" + vars[1]);
  var amount_time  = vars[0]/ 360000 ;
  var message = document.getElementById('output_message').innerHTML = `<b>経過時間:${amount_time}時間 </b>`
  var peoples = document.getElementById('peoples').innerHTML = `<b>人数:${vars[1]} </b>`
  var per_cost = document.getElementById('per_cost').innerHTML = `<b>一人あたりのコスト:${vars[2]} 円/時間</b>`
  
  var amount_cost =  Math.round(amount_time * vars[1] * vars[2]);
  var result = document.getElementById('result').innerHTML = `<b>今回の会議のコストは:${amount_cost }円 だぜ！！</b>`
    

  return vars;
  

  


  // console.log(output_message);
}
getUrlVars();
// console.log(vars);
// console.log(output_message);

// var getparam = location.search.substring(param.length, location.search.length);
// getparam = unescape(getparam);
// document.getElementById("output_message").innerHTML = getparam;

// console.log(getparam);
