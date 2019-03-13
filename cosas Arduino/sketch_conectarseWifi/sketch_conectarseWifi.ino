#include <WiFi.h>

char WIFI_SSID[]="PJ MI8 SE";
char WIFI_PASSWORD[]="workshopfium";

int status = WL_IDLE_STATUS;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(2000);
  
  while (status != WL_CONNECTED) {
      Serial.print("Attempting to connect to SSID: ");
      Serial.println(WIFI_SSID);
      // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
      status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

      // wait 5 seconds for connection:
      delay(5000);
  }

  Serial.println("Connected to wifi");
}

void loop() {
  // put your main code here, to run repeatedly:

}
