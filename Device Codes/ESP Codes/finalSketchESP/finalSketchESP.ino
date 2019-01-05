#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


const char* ssid = "HomeBro_ULTERA";
const char* password = "samson2018";
float ppm = 0;

void setup () {

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    delay(1000);
    Serial.println("Connecting..");
  }
  
  while(!Serial){
    ;
  }

}

void loop() {    
    
    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

      //start of inserted code for sending the gathered data from Arduino
      if(Serial.available()){
        
        StaticJsonBuffer<300> JSONbuffer;
        JsonObject& JSONencoder = JSONbuffer.createObject();
  
        ppm = Serial.write(Serial.read());
        JSONencoder["ppm"] = ppm;
    
        char JSONmessageBuffer[300];
        JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
         Serial.println(JSONmessageBuffer);
        
        HTTPClient http;  //Declare an object of class HTTPClient
        
        http.begin("http://128.199.165.229/api/colevel");  //Specify request destination
        http.setAuthorization("admin", "admin");
        http.addHeader("Content-type", "application/json"); 
        
        int httpCode = http.POST(JSONmessageBuffer);
        String payload = http.getString();
      
        Serial.println(httpCode);
        Serial.println(payload);
    
        http.end();   //Close connection
       }
    }else{
      Serial.println("Error in Wifi connection");
    }
    delay(30000);    //Send a request every 30 seconds
}
