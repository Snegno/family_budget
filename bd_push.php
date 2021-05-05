<?php

error_reporting(E_ALL); 
ini_set('display_errors', 1); 

header('Content-type: text/html; charset=utf-8');

$link = mysqli_connect("127.0.0.1", "r97787o2_test", "Tornado01", "r97787o2_test");
 
if (!$link) {
      echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
      exit;
    }

$temp = $_POST['name'];
$field_name = $_POST['field_name'];
$field_name_2 = $_POST['field_name_2'];
$about = $_POST['about'];
$date = $_POST['date'];

echo $field_name;

// вставляем данные в таблицу

$sql = "INSERT INTO one_test (".$field_name.", ".$field_name_2.", `data`) VALUES ('".$temp."', '".$about."', '".$date."')"; 

$result = mysqli_query($link, $sql) or die("Ошибка".mysqli_error($link));

?>