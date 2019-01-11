#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


const char* ssid = "HomeBro_ULTERA";
const char* password = "samson2018";


void setup () {

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    delay(1000);
    Serial.print("Connecting..");

  }

}

void loop() {

  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    StaticJsonBuffer<300> JSONbuffer;
    JsonObject& JSONencoder = JSONbuffer.createObject();
   
 
    JSONencoder["ppm"] = 12;

    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
     Serial.println(JSONmessageBuffer);
    
    HTTPClient http;  //Declare an object of class HTTPClient
    
    http.begin("http://192.168.15.2:8000/airquality/");  //Specify request destination
    http.setAuthorization("admin", "admin");
    http.addHeader("Content-type", "application/json"); 
    
    int httpCode = http.POST(JSONmessageBuffer);
    String payload = http.getString();
  
    Serial.println(httpCode);
    Serial.println(payload);

    http.end();   //Close connection

  }else{
    Serial.println("Error in Wifi connection");
  }

  delay(30000);    //Send a request every 30 seconds

}
