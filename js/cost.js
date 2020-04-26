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
  var message = document.getElementById('output_message').innerHTML = `<b>経過時間:${vars[0]} </b>`
  var peoples = document.getElementById('peoples').innerHTML = `<b>人数:${vars[1]} </b>`
  var per_cost = document.getElementById('per_cost').innerHTML = `<b>一人あたりのコスト:${vars[2]} </b>`
    
  alert(vars[0]);

  return vars;
  
  message.document.getElementById('output_message').innerHTML = '<b>Test:</b>';
  


  // console.log(output_message);
}
getUrlVars();
// console.log(vars);
// console.log(output_message);

// var getparam = location.search.substring(param.length, location.search.length);
// getparam = unescape(getparam);
// document.getElementById("output_message").innerHTML = getparam;

// console.log(getparam);
