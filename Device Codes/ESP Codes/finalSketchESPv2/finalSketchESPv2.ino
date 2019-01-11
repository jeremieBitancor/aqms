#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "HomeBro_ULTERA";
const char* password = "samson2018";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while(!Serial){
    ;
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    //delay(150000);
    String ppm_value;
    ppm_value = Serial.readStringUntil('\r');
    Serial.setTimeout(500);

    sendCOData (ppm_value);
    
  }
  delay(5000); //Send request every 5000 millis or 5 seconds
}


void sendCOData (String get_ppm_value){
  StaticJsonBuffer<300> JSONbuffer;
    JsonObject& JSONencoder = JSONbuffer.createObject();
    JSONencoder["ppm"] = get_ppm_value;
    
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    Serial.println(JSONmessageBuffer);
      
    HTTPClient http;  //Declare an object of class HTTPClient
      
    http.begin("http://128.199.165.229/api/colevel/");  //Specify request destination
    http.setAuthorization("admin", "admin");
    http.addHeader("Content-type", "application/json"); 
       
    int httpCode = http.POST(JSONmessageBuffer);
    String payload = http.getString();
    
    Serial.println(httpCode);
    Serial.println(payload);
    
    http.end();   //Close connection
    //Serial.println(ppm_value);
    //Serial.println("Checking the right Data");
    //Serial.println(ppm_value);  
}

