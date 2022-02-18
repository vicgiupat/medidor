var dt_hr = new Date();

let atr_dt_hr = [

	hr_hora = dt_hr.getHours(),
	hr_min = dt_hr.getMinutes(),
	hr_seg = dt_hr.getSeconds(),
	dt_dia = dt_hr.getDate(),
	dt_mes = dt_hr.getMonth() + 1,
	dt_ano = dt_hr.getFullYear()
];

var data = atr_dt_hr

function renderDataHora(d) {
	$('.content').append('<div class="data_mensagem"><i>' + d.data[3] + '/' + d.data[4] + '/' + d.data[5] + '........' + d.data[0] + ':' +
		d.data[1] + ':' + d.data[2] + '</i></div>')
}