#include <SoftwareSerial.h>
#include <LiquidCrystal.h>

float t=0;
char data = 0;

String apiKey = "OL1QI0MYUD4TD3BL";  // Write API key




// connect 10 to TX of Serial USB
// connect 11 to RX of serial USB
SoftwareSerial ser(10,11); // RX, TX

void setup() 

{                
// enable debug serial 
  Serial.begin(9600); //  serial data transmission at Baudrate of 9600

// enable software serial

  ser.begin(9600);

  ser.println("AT");  // Attenuation

  delay(1000);

  ser.println("AT+GMR"); // To view version info for ESP-01 output: 00160901 and ESP-12 output: 0018000902-AI03

  delay(1000);

  ser.println("AT+CWMODE=3"); // To determine WiFi mode
/*
1 = Station mode (client)
2 = AP mode (host)
3 = AP + Station mode (ESP8266 has a dual mode) 
*/
   

  delay(1000);

  ser.println("AT+RST"); // To restart the module

  delay(5000);

  ser.println("AT+CIPMUX=1"); // Enable multiple connections
  /*

    0: Single connection
    1: Multiple connections (MAX 4)
 
*/
   

  delay(1000);

  String cmd="AT+CWJAP=\"HomeBro_ULTERA\",\"samson2018\""; // connect to Wi-Fi 

  ser.println(cmd);

  delay(1000);

  ser.println("AT+CIFSR"); // Return or get the local IP address

  delay(1000);

  Serial.print("Wifi Connected");
 }



// the loop 

void loop()

{

  delay(1000);

  t = analogRead(A0);  // Read sensor value and stores in a variable t

  Serial.print("Impedance = ");

  Serial.println(t);

  esp_8266();


}


void esp_8266()

{

   // TCP connection AT+CIPSTART=4,"TCP","184.106.153.149",80 

    String cmd = "AT+CIPSTART=4,\"TCP\",\"";  // Establish TCP connection
    /*
     AT+CIPSTART=id,type,addr,port
     
    id: 0-4, id of connection
    type: String, “TCP” or “UDP”
    addr: String, remote IP
    port: String, remote port
 
    */
    cmd += "184.106.153.149"; // api.thingspeak.com

    cmd += "\",80";

    ser.println(cmd);

    Serial.println(cmd); 

    if(ser.find("Error"))

    {

      Serial.println("AT+CIPSTART error");

      return;

    }

  String getStr = "GET /update?api_key=";  // API key

  getStr += apiKey;

  //getStr +="&field1=";

  //getStr +=String(h);

  getStr +="&field1=";

  getStr +=String(t);

  getStr += "\r\n\r\n";

  // send data length

  cmd = "AT+CIPSEND=4"; // Send data AT+CIPSEND=id,length

  cmd += String(getStr.length());

  ser.println(cmd);

  Serial.println(cmd);

  delay(1000);

  ser.print(getStr);

  Serial.println(getStr);

     

  // thingspeak needs 16 sec delay between updates

  delay(16000);  

}

