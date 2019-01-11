void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while(!Serial){
    ;
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    float ppm_value;
    ppm_value = Serial.write(Serial.read());
    //Serial.println(ppm_value);
    //Serial.println("Checking the right Data");
    //Serial.println(ppm_value);
    
  }
}
