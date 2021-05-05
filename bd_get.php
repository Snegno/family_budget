<?php

error_reporting(E_ALL); 
ini_set('display_errors', 1); 

$link = mysqli_connect("127.0.0.1", "r97787o2_test", "Tornado01", "r97787o2_test");
 
if (!$link) {
      echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
      exit;
    }


//массив для хранения то что передадим
$get_arr = array();


// получить значение из столбца Приход
$sql_get = "SELECT * FROM `one_test`";
$read_result = mysqli_query($link, $sql_get);

//забираем одну строку из бд
//$poluchil = mysqli_fetch_assoc($read_result);

//забираем все строки
while ($poluchil = mysqli_fetch_assoc($read_result)) {
	//вывести все элементы которые имеют ид
	//echo $poluchil['id'];

	// помещаем в массив что получили
	$get_arr[] = $poluchil;
}

$json = json_encode($get_arr);

echo $json;




//переделываем массив в json
//echo json_encode($get_arr);
//$get_arr[0] = '1';
//echo $get_arr;

?>