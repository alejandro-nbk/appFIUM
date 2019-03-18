#define TIEMPOLEDROJO 300

const int motionSensor = 27;
const int ledRojo = 26;
const int ledVerde = 25;
const int ledA = 32;
const int ledB = 33;


unsigned long momentoInterrupcion = 0;
unsigned long momentoActual = 0;
unsigned long periodo = 3000;
boolean timerActivo = false;
boolean luzEncendida = false;

boolean encender = true;

void detectsMovement() {
  // Desactivamos esta interrupción
  detachInterrupt(digitalPinToInterrupt(motionSensor));
  Serial.println("MOTION DETECTED");
  // Apuntamos en qué momento ha ocurrido
  momentoInterrupcion = millis();
  Serial.println(momentoInterrupcion);
  // La ponemos a true para que vuelva a tener en cuenta el periodo de tiempo
  timerActivo = true;
  luzEncendida = true;
  digitalWrite(ledRojo, HIGH);
  digitalWrite(ledVerde, LOW);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(motionSensor, INPUT_PULLUP);
  // Set motionSensor pin as interrupt, assign interrupt function and set RISING mode
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);

  pinMode(ledRojo, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledA, OUTPUT);
  pinMode(ledB, OUTPUT);
  
  digitalWrite(ledRojo, LOW);
  digitalWrite(ledVerde, HIGH);
  digitalWrite(ledA, !encender);
  digitalWrite(ledB, encender);
}

void loop() {
  if (luzEncendida) {
    delay(TIEMPOLEDROJO);
    luzEncendida = false;
    digitalWrite(ledRojo, LOW);
  } else delay(300);
  digitalWrite(ledA, encender);
  digitalWrite(ledB, !encender);
  encender = !encender;
  
  momentoActual = millis();
  if (timerActivo && ((momentoActual - momentoInterrupcion) > periodo)) {
    Serial.println("Vuelve a poder detectarse");
    timerActivo = false;
    digitalWrite(ledVerde, HIGH);
    // Como ya ha pasado cierto tiempo, activamos otra vez la interrupción
    attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
  }
}
