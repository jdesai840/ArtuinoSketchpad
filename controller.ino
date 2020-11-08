const int switchPin = 11;
const int yPin = A0;
const int xPin = A1;

const int red = 6;
const int green = 5;
const int blue = 3;

int r = 0;
int g = 0;
int b = 0;

void setup() {
  pinMode(switchPin, INPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  digitalWrite(switchPin, HIGH);
  Serial.begin(9600);
}

void loop() {
  Serial.print(digitalRead(switchPin));
  Serial.print(",");
  Serial.print(analogRead(xPin));
  Serial.print(",");
  Serial.println(analogRead(yPin));
  delay(200);

  if (digitalRead(switchPin) == 0){
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);

    analogWrite(red, r);
    analogWrite(green, g);
    analogWrite(blue, b);
    delay(10);
  }
}
