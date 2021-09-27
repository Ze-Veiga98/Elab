// Define to which pins of the arduino the output of the LM35 is connected
int period = 1000;
unsigned long time_now = 0;
int N = 100;
int pin1 = A0;
int pin2 = A1;
int pin3 = A2;
int pin4 = A3;
int pin5 = A4;
int pin6 = A5;
void setup(){
    // Begin Serial communication at a baud rate of 9600
    Serial.begin(9600); 
    pinMode(pin1, INPUT);
    pinMode(pin2, INPUT);
    pinMode(pin3, INPUT);
    pinMode(pin4, INPUT);
    pinMode(pin5, INPUT);
    pinMode(pin6, INPUT);
    
}

void loop(){
  time_now = millis();

    // Convert the voltage into the temperature in degree Celsius:
    float temperature1 = average1(pin1);
    float temperature2 = average1(pin2);
    float temperature3 = average1(pin3);
    float temperature4 = average1(pin4);
    float temperature5 = average1(pin5);
    //float temperature6 = average1(pin6);

    // Print the temperature in the Serial Monitor:
    Serial.print("T1 = ");
    Serial.print(temperature1);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.println(",");

    Serial.print("T2 = ");
    Serial.print(temperature2);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.print(",");

    Serial.print("T3 = ");
    Serial.print(temperature3);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.print(",");

    Serial.print("T4 = ");
    Serial.print(temperature4);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.println(",");

    Serial.print("T5 = ");
    Serial.print(temperature5);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.println(",");

    Serial.print("T6 = ");
    Serial.print(temperature6);
    Serial.print(" \xC2\xB0"); // shows degree symbol
    Serial.print("C");
    Serial.println(",");

   // usar isso ou delay para acelerar o processo
    /*while(millis() < time_now + period){
        //wait approx. [period] ms
    }*/
    delay(1000); // wait a second between readings

}


float average1(int pin){
  float sum = 0.0;
  for (int i =0; i < N ; i++){
    sum += analogRead(pin)*(5/(1023*0.01));
  }
    return sum/N;


  
}








 
