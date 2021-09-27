// demo of Grove - High Temperature Sensor
// Thmc -> A1
// RoomTemp -> A0
/*
 This example is for calibrating the High-temperature Sensor.
 You need to run the example 'get temperature-calibration-measurement'
 and follow the hints of the serial message first. After all the 
 measurement finished, the message like
"
10:02:17.792 -> You have Scucessfully record the data,please copy the following line of code to your clipboard and replace the line of xx=... in xxx.c
10:02:17.935 ->       double TMP[]={10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29};
10:02:18.038 ->       double Real_temperature[]={10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00};

"
will be showin on your screen.
Please copy it and replace the first line of function loop(）,then run this example.
*/

#include "High_Temp.h"

HighTemp ht(A1, A0);

void setup()
{
    Serial.begin(9600);
    Serial.println("grove - hight temperature sensor test demo");
    ht.begin();
}

void loop()
{
double TMP[]={9.00,22.71,44.08,52.89,29.77,84.69,92.69,101,113.69,124.69};
double Real_temperature[]={10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00};
   double x,y,t;
   unsigned char len,i,j,k;
   x=ht.getThmc();
   
   for(i=0;i<len;i++){
          j=i;
      if(x<=TMP[i]){break;}}
      
    //Lagrange quadratic interpolation
   double arr_x[]={TMP[j-1],TMP[j],TMP[j+1]};
   double arr_y[]={Real_temperature[j-1],Real_temperature[j],Real_temperature[j+1]};
    if(j==1){y=x;}else{
    y=0;
    for(k=0;k<3;k++){
      t=1;
      for(j=0;j<3;j++){
        if(k!=j){t=t*((x-arr_x[j])/(arr_x[k]-arr_x[j]));}}
         y=y+arr_y[k]*t;}}
    
    Serial.println("before calibration");
    Serial.println(x);
    
    Serial.println("after calibration");
    Serial.println(y);
    delay(100);
}
