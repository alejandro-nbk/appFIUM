#include <WiFi.h>
#include <HTTPClient.h>

// Variables asociadas a los distintos pins
const int motionSensor = 27;
const int ledRojo = 26;
const int ledVerde = 25;
const int ledA = 32;
const int ledB = 33;
const int ledWifi = 21;

// Variables para detectar movimiento y manejar los LEDs
unsigned long momentoInterrupcion = 0;
unsigned long momentoActual = 0;
unsigned long periodo = 3000;
boolean timerActivo = false;
boolean luzEncendida = false;
boolean encender = true;
// Variables para conectarse al WiFi
char WIFI_SSID[]="NUBIKA"; //PJ MI8 SE
char WIFI_PASSWORD[]="Nubik@2017"; //workshopfium
int estado = WL_IDLE_STATUS;

// Variables para enviar la petición
HTTPClient http;
boolean enviarMensaje = false;
String line;
boolean escrito = false;

void detectsMovement() {
  // Desactivamos esta interrupción
  detachInterrupt(digitalPinToInterrupt(motionSensor));
  Serial.println("MOVIMIENTO DETECTADO");
  
  // Apuntamos en qué momento ha ocurrido y activamos el "timer"
  momentoInterrupcion = millis();
  timerActivo = true;
  luzEncendida = true;
  digitalWrite(ledRojo, HIGH);
  digitalWrite(ledVerde, LOW);
  //Decimos que envíen el mensaje
  enviarMensaje = true;
}
 
void setup() {
  Serial.begin(115200);

  // Asignamos el modo de cada PIN
  pinMode(motionSensor, INPUT_PULLUP);
  pinMode(ledRojo, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledA, OUTPUT);
  pinMode(ledB, OUTPUT);
  pinMode(ledWifi, OUTPUT);

  // Inicializamos los LEDs
  digitalWrite(ledRojo, LOW);
  digitalWrite(ledVerde, HIGH);
  digitalWrite(ledA, !encender);
  digitalWrite(ledB, encender);
  digitalWrite(ledWifi, LOW);
  
  // Nos intentamos conectar al WiFi
  while (estado != WL_CONNECTED) {
      Serial.print("Intentando conectarse al SSID: ");
      Serial.println(WIFI_SSID);      
      estado = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

      // Esperamos 2 segundos antes de volver a intentarlo
      delay(2000);
  }
  Serial.println("Conectado al WiFi");
  digitalWrite(ledWifi, HIGH);

  http.begin("https://cp03g8z863.execute-api.eu-west-2.amazonaws.com/Prod/calc");
  // Vinculamos el método de detectar movimiento con el sensor
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
}

void loop() {
  // Si ha habido una interrupción, entonces enviamos mensaje
  if (enviarMensaje) {
    enviarMensaje = false;
    Serial.println("Enviando...");
    http.GET();
    Serial.print("Respuesta: ");
    Serial.println(http.getString());
  }

  // Encendemos/Apagamos los LEDs por diversión
  if (luzEncendida) {
    delay(300);
    luzEncendida = false;
    digitalWrite(ledRojo, LOW);
  } else delay(300);
  digitalWrite(ledA, encender);
  digitalWrite(ledB, !encender);
  encender = !encender;

  // Comprobamos si se ha activado el timer y si ha pasado suficiente tiempo para activar la interrupción
  momentoActual = millis();
  if (timerActivo && ((momentoActual - momentoInterrupcion) > periodo)) {
    Serial.println("Vuelve a poder detectarse");
    timerActivo = false;
    digitalWrite(ledVerde, HIGH);
    // Como ya ha pasado cierto tiempo, activamos otra vez la interrupción
    attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
  }
}
