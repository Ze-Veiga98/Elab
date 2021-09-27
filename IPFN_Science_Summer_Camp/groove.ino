
#include "High_Temp.h" 


HighTemp ht(A1,A0);

void setup() {
    Serial.begin(9600);
   
    Serial.println("grove - hight temperature sensor test demo");
    ht.begin();
}

void loop() {
   
    Serial.println(ht.getThmc());
    delay(1000);
}
