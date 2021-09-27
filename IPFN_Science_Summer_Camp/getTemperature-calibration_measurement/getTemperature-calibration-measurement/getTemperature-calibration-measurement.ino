// calibration of Grove - High Temperature Sensor
// Thmc -> A1
// RoomTemp -> A0
/*
 *
 This example is for calibrating the High-temperature Sensor.
 You need to have a sample temperature for reference. Please 
 follow the hints of the serial message and adjust the sample 
 Temperature of the probe to match it. Then type o for next 
 measurement. Over-dense sampling points can cause shocks. 
 Too much sample points or intervals between each sample of 
 less than 5% than the range are not recommended.
 After all the measurement finished, message like
"
10:02:17.792 -> "You have Scucessfully record the sample data,please copy the following line of code to your clipboard and replace the first line of function loop()
10:02:17.935 ->       double TMP[]={10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29,10.29};
10:02:18.038 ->       double Real_temperature[]={10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00};

"
will be printed by the serial port. Please copy it into the file getTemperature-
-calibration_demo.
 */

#include "High_Temp.h"

HighTemp ht(A1, A0);

void setup()
{
    Serial.begin(9600);
    Serial.println("grove - hight temperature sensor calibration");
    ht.begin();
}

void loop()
{
    float Real_temperature[]={10,20,30,40,50,60,70,80,90,100};
    //You can change the point for calibration by yourself,and the lenth of this arry is flexiable.
    //Please make sure thate calibration range is wider than the actual measurement time.
    
    unsigned char len = sizeof(Real_temperature)/sizeof(Real_temperature[0]);
    unsigned char i,rec;
    float measured_temperature[len],f[len];
    float t, x,y;
    for(i=0;i<len;i++){
        Serial.println("please type 'o' to serial port if the environment temprature can match the following value'Real temprature=");
           Serial.println(Real_temperature[i]);
           rec=0;
         while(1){
         if (Serial.available()>0) { 
          rec=Serial.read();
        if(rec=='o'){measured_temperature[i]=ht.getThmc();//sensor
       Serial.println("success");break;}
       }
       }
       }

     Serial.println("You have Scucessfully record the sample data,please copy the following line of code to your clipboard and replace the first line of function loop()");
     Serial.print("      double TMP[]={");
 
     for(i=0;i<len-1;i++){
          Serial.print(measured_temperature[i]);   Serial.print(",");}
          Serial.print(measured_temperature[len-1]);   Serial.println("};");
 
      Serial.print("      double Real_temperature[]={");
       for(i=0;i<len-1;i++){
          Serial.print(Real_temperature[i]);   Serial.print(",");}
          Serial.print(Real_temperature[len-1]);   Serial.println("};");
while(1);
}
