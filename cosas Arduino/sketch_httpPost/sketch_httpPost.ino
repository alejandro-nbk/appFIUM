#include <WiFi.h>

// Variables para conectarse al WiFi
char WIFI_SSID[]="Javi";
char WIFI_PASSWORD[]="12345678";

int estado = WL_IDLE_STATUS;
char servername[]="www.google.es";

// Variables para hacer el HTTP POST request
WiFiClient client;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  // Nos intentamos conectar al WiFi
  while (estado != WL_CONNECTED) {
      Serial.print("Intentando conectarse al SSID: ");
      Serial.println(WIFI_SSID);
      estado = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

      // Esperamos 5 segundos antes de volver a intentarlo
      delay(5000);
  }
  Serial.println("Conectado al WiFi");

  
  if (client.connect(servername, 80)){
    Serial.println("Conectado");
    client.println("GET /search?q=arduino HTTP/1.1");
    client.println();
    
  } else {
    client.println("RIP");
  }
  
}

void loop() {
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting from server.");
    client.stop();
    while(true);
  }
}
