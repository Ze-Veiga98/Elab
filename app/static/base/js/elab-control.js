// javascript 

var base_url = "http://127.0.0.1:5000";
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
      console.log(typeof response.Data);
      
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
          mytable.forEach(function(entry) {
          
          // table body
          for (var k in entry){

                html += "<td>" + entry[k]  +  "</td>";
          }
          html += "</tr >";
          });
          html += "</table>";
          document.getElementById("result").innerHTML = html;
          
        }
       
        getData();
      }
     
    }
  });
}

function generate_table() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  //var header = document.createElement("header");
  var header = '<tr><th>fg</th><th>City</th></tr>';

  //var header = "<th>Header</th>";
  var tblBody = document.createElement("tbody");


  // creating all cells
  for (var i = 0; i < results.weak_sent.length; i++) {
      // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < 2; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          if (j == 0) {
              var cellText = document.createTextNode(results.weak_sent_num[i]);
          } else {
              var cellText = document.createTextNode(results.weak_sent[i]);
          }


          cell.appendChild(cellText);
          row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
  }
  // This is for the quick solution
  tbl.innerHTML = header
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);



  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}





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


