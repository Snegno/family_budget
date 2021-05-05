
// форма входа
$(document).ready(function(){

	$('.acces__in').click(function(){
		console.log('click')
		let temp_pass = 1505;

		if ($('.acces__input').val() == temp_pass) {
			$('.result').toggleClass("result--hide");
			$('.acces').toggleClass("result--hide");
			$('.acces__input').val('');
		}

	})
})

// запрос на добавление в БД
$('.push_buy').click(
	function(event){
		event.preventDefault();
    // получаем введенную сумму в инпуте
   	let field_name = $(this).attr('id');
   	let field_name_2 = field_name+'_about';
   	let name = $('.add_buy__'+field_name).val();
    // получаем что ввели в поле комментария
    	let about = $('.add_about__'+field_name).val();

    //получаем дату
    	let get_data = new Date();
    	let day = get_data.getDate();
    	let month = get_data.getMonth()+1;
    	let year = get_data.getFullYear();

    	let push_date = String(day) + '-' + String(month) + '-' + String(year);

	    $.ajax({
		    	type: 'POST',
		  		url: 'bd_push.php',
		  		datatype: 'json',
		  		data: {
		  			"name": name,
		  			"field_name": field_name,
		  			"field_name_2": field_name_2,
		  			"about": about,
		  			"date": push_date
		  		},
		  		success: function(data) {

			    	if(data!='success'){
			    		console.log("Данные отправлены!11");
			    		show_money();
			    	}

		  		}
			});

    	$('.add_buy__'+field_name).val('');
    	$('.add_about__'+field_name).val('');

});

let temp_obj;

// забираем из базы

	function show_money(e){

		//получаем дату
    	let get_data_now = new Date();
    	let month_now = get_data_now.getMonth()+1;

    	//сюда будем класть месяц пуша 
    	let arr_data;
		
		$.ajax({
		  type: "POST",
	     url: "bd_get.php",
	     datatype: 'json',
	     success: function(response) {
	     		
	     		//что-то делаем с полученным Респонсом
	     		let res = response;

				temp_obj = res;

				//парсим
				temp_obj = JSON.parse(temp_obj);
				//console.log('полученные отпарсеные данные: '+res);


				// Считаем и выводим инфу =======================================

				let column_name = ['eat', 'drinks', 'bitovie', 'free'];
				let its;
				//считаем сумму еат и выводим
				let summ = 0;
				let result = 0;
				let in_numb;
				let push_li = false;

				for(let t=0; t<column_name.length; t++) {

						its = column_name[t];
						
						// находим траты на еду
						for(let i=0; i<temp_obj.length; i++){
							in_numb = Number(temp_obj[i][its]);
							//console.log('in numb = '+temp_obj[i][its])
							//Если месяц совпадает с текущим тогда кладем цифру в Сумму
							arr_data = temp_obj[i].data.split('-');

							if(month_now == arr_data[1] && in_numb > 0) {
								summ += in_numb;
							}

						}
		
						$('.potracheno_'+its+'').val(summ);

						// находим запись о Максимуме на Еду, считаем и выводит сколько осталось
						for(let i=0; i<temp_obj.length; i++){
							in_numb = Number(temp_obj[i][its+'_max']);
							result += in_numb;
						}
						
						result -= summ; 
						$('.ostatok_'+its+'').val(result);

						// Комменты
						for(let i=0; i<temp_obj.length; i++){
							//Если месяц совпадает с текущим тогда кладем цифру в Сумму
							arr_data = temp_obj[i].data.split('-');
							in_numb = Number(temp_obj[i][its]);
							if(month_now == arr_data[1] && in_numb > 0 && push_li == false) {
								$('.comments__list').append('<li class="result--hide li_'+its+' comments__element'+i+'">');
								$('.comments__list').append('<input class="result--hide comment__input_data hide_'+its+' comments__data'+i+'">');
								$('.comments__list').append('<input class="result--hide comment__input_price hide_'+its+' comments__buy'+i+'">');
								$('.comments__list').append('<textarea class="result--hide comment__input_text hide_'+its+' comments__comment'+i+'">');
								$('.comments__data'+i+'').val('Дата '+temp_obj[i].data);
								$('.comments__buy'+i+'').val(temp_obj[i][its]+' руб.');
								$('.comments__comment'+i+'').val(temp_obj[i][its+'_about']);
							}
						}
						//обнуляемся
						summ = 0;
						result = 0;
						in_numb = 0;
				}	
				//показываем что уже их добавляли дабы не было клонов
				push_li = true;
	     },
	     error: function(request, status, errorT) {
	          alert('error');
	     }
		});
	 }
				
show_money();

let temp;
let temp_id;

$('.open').click(function(e){
		console.log('event: ',e);
		temp = e.target.classList[1];
		temp_id = e.target.id;
		
		$('.hide_'+temp_id+'').toggleClass('result--hide');
		$('.li_'+temp_id+'').toggleClass('result--hide');
		$('.result').toggleClass("result--hide");
		$('.on_back').toggleClass("result--hide");
});

$('.on_back').click(function(e){
	console.log('event = ',e)

		$('.hide_'+temp_id+'').toggleClass('result--hide');
		$('.li_'+temp_id+'').toggleClass('result--hide');
		$('.result').toggleClass("result--hide");
		$('.on_back').toggleClass("result--hide");
});

