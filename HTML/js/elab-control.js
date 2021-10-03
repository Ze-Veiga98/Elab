var base_url = "http://127.0.0.1:8001";
let Results=0;
var DeltaX=0;
var Samples=0;
var point_x;
var point_y;
var name = ''
var frist=0;
var point_x;
var point_y;
var output_data = [];

var DeltaX = document.getElementById('DeltaX');
var Samples = document.getElementById('Samples');


function start_Pendulum() {
  // get inputs values from the client side
  if ($("#DeltaX").val() !== undefined)
    DeltaX = $("#DeltaX").val();
  if ($("#Samples").val() !== undefined)
    Samples = $("#Samples").val();

  JSON = '{"experiment_name": "Pendulo", "config_experiment": {"DeltaX":'+ String(DeltaX)+', "Samples":'+String(Samples)+' }}'
  var endpoint =  base_url + '/user';
  // print out
  console.log('JSON : ' +  endpoint);
  console.log('JSON : ' +  JSON);

  $.ajax({
    url: endpoint,   //Your api url
    type: 'POST',   //type is any HTTP method
    contentType: 'application/json;charset=UTF-8',
    data: JSON,
    success: function (response){
    console.log('PUT response in:' +response);
    }
  });
  // não quero fazer pontos no botão start!
  getData(); 
  

}

var mytable = [];



function getData(){
  var endpoint =  base_url + '/resultpoint';
  $.ajax({
    url: endpoint,   //Your api url
    type: 'GET',   //type is any HTTP method
    contentType: 'application/json;charset=UTF-8',
    success: function (response){
      if (frist == 0)
		{
			res = Object.keys(response.Data);
      
			buildPlot1(res);
      //buildPlot2(res);  // grafico de temperatura não 
      buildPlot3(res);
			frist = 1;
		}
      console.log(response);
      if (response.status !== 'undefined' && response.status === 'Experiment Ended'){
          myStopFunction();
      }
      else{
       
        if (typeof response.Data === 'object'){
          
          
          Plotly.extendTraces('myplot', {x: [[response.Data.Sample_number]],y: [[response.Data.velocity]]}, [0]);
          //Plotly.extendTraces('myplot1', {x: [[response.Data.e_period]],y: [[response.Data.period]]}, [0]);
          Plotly.extendTraces('myplot2', {x: [[response.Data.e_velocity]],y: [[response.Data.velocity]]}, [0]);
          //console.log('ola:'+ response.Data.Sample_number);
          //console.log('ola:'+ response.Data.);
          mytable.push(response.Data);
         // create a table
          var html = "<table>";
         
           mytable.forEach(function(data) {
           for (var i in data ){
                 html += "<td>" + data[i]  +  "</td>";
           }
           html += "</tr >";
           });
           html += "</table>";
		// assumes <div id="result"></div>
           document.getElementById("result").innerHTML = html;
        }
        getData();
      }
     
    }
  });
}


/*
Não percebo porquê que não funciona com o nosso endpoint...... 'https://127.0.0.1:5000/resultpoint'!
$.ajax({
  url: base_url + '/resultpoint',
  type: "get",
  dataType: "json",

  success: function(results) {
      drawTable(results.Data);
  }
});

function drawTable(data){
  for (var i = 0; i < data.length; i++){
      drawRow(data[i]);
  }
}

function drawRow(rowData){
  var row = $("<tr />")
  $("#result").append(row);
  row.append($("<td>" + rowData.Sample_number + "</td>"));
    row.append($("<td>" + rowData.period + "</td>"));
    row.append($("<td>" + rowData.e_period + "</td>"));
 

}*/



//// nao usado
function tablebind() {  
  $.ajax({  
      type: "GET",  
      contentType: "application/json; charset=utf-8",  
      url: base_url + '/resultpoint',  
      data: "{}",  
      contentType: 'application/json;charset=UTF-8',
      success: function (response) {  
          var obj = $.parseJSON(response.d);  
          if (obj.length > 0) {  

              var data = obj[0].Table1;  
              var table = $("<table />");  
              table[0].border = "1";  

              var row$;  

              var columns = addAllColumnHeaders(data);  
              for (var i = 0; i < data.length; i++) {  
                  row$ = $('<tr/>');  
           
                  for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
                      var cellValue = data[i][columns[colIndex]];  

                      if (cellValue == null) { cellValue = ""; }  

                      row$.append($('<td/>').html(cellValue));  
                  }  
                  $("#jsonTable").append(row$);  
              }  
               
          }  

      },  
      error: function (response) {  
          //                      
      }  
  });  

}  




var point_x;
var point_y;
//////////////////////////////////////////

function buildPlot1(res) {

  console.log(res);
  var trace1 = {
		x: [],
		y: [],
    mode: 'lines+markers',
		line: {
		  color: '#80CAF6',
		  shape: 'linear'
		},
		
		name: res[1]
	  };

    var output_data = [trace1];

    var layout = {
      title: 'velocidade linear em função de número de amostras',
      height: 500, // os valores são todos em pixels
      font: {
      family: 'Lato',
      size: 16,
      color: 'black'
      },

      xaxis: {
            title: 'Amostra[N]',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            },
      yaxis: {
            title: 'velocidade linear[m/s]',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            }
     };

     Plotly.newPlot('myplot', output_data, layout);
   
}



function myStopFunction() {
  clearInterval(Results);
  console.log(Results);
}



///////////////////

function buildPlot2(res) {
  console.log(res);
  var trace2 = {
		x: [],
		y: [],
    name:'Histograma de Periodo de movimento',
    mode: 'lines+markers',
    type: 'bar',
		line: {
		  color: '#80CAF6',
		  shape: 'linear'
		},
		
		name: res[2]
	  };

    var output_data = [trace2];

    var layout = {
      title: '',
      height: 500, // os valores são todos em pixels
      font: {
      family: 'Lato',
      size: 16,
      color: 'black'
      },

      xaxis: {
            
            title: 'periodo[s]',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            },
      yaxis: {
        //range:[0.19,0.21],
            title: '# de Eventos',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            }
     };

     Plotly.newPlot('myplot1', output_data, layout);
   
}


function buildPlot3(res) {
  console.log(res);
  var trace3 = {
		x: [],
		y: [],
    mode: 'lines+markers',
    type: 'histogram',
		line: {
		  color: '#80CAF6',
		  shape: 'linear'
		},
		
		name: res[3]
	  };

    var output_data = [trace3];

    var layout = {
      title: 'Histograma de Periodo de movimento',
      height: 500, // os valores são todos em pixels
      font: {
      family: 'Lato',
      size: 16,
      color: 'black'
      },

      xaxis: {
            
            title: 'periodo[s]',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            },
      yaxis: {
        //range:[0.19,0.21],
            title: '# de Eventos',
            titlefont:{
                  color: 'black',
                  size: 14
                  },
                  rangemode: 'tozero'
            }
     };

     Plotly.newPlot('myplot2', output_data, layout);
   
    }







function set_reset() {
  var resetBtn = document.getElementById('resetBtn');
  var location = window.location.href.split('?')[0];
  
    resetBtn.addEventListener('click', function(event) {
    console.log('Reseting values of R or iteration...');
    window.location.href = location;
    });
    }



