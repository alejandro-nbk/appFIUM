const int motionSensor = 27;
unsigned long momentoInterrupcion = 0;
unsigned long momentoActual = 0;
unsigned long periodo = 5000;
boolean timerActivo = false;

void detectsMovement() {
  // Desactivamos esta interrupción
  detachInterrupt(digitalPinToInterrupt(motionSensor));
  Serial.println("MOTION DETECTED");
  // Apuntamos en qué momento ha ocurrido
  momentoInterrupcion = millis();
  Serial.println(momentoInterrupcion);
  // La ponemos a true para que vuelva a tener en cuenta el periodo de tiempo
  timerActivo = true;
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(motionSensor, INPUT_PULLUP);
  // Set motionSensor pin as interrupt, assign interrupt function and set RISING mode
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
}

void loop() {
  momentoActual = millis();
  if (timerActivo && ((momentoActual - momentoInterrupcion) > periodo)) {
    Serial.println("Vuelve a poder detectarse");
    timerActivo = false;
    // Como ya ha pasado cierto tiempo, activamos otra vez la interrupción
    attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
  }
}
