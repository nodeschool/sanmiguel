# Armstrong number

An Armstrong number is a number that is the sum of its own digits each raised to the power of the number of digits.

For example:

- 9 is an Armstrong number, **because** 9 = 9^1 = 9

- 10 is not an Armstrong number, **because** 10 != 1^2 + - 0^2 = 2

- 153 is an Armstrong number, **because**: 153 = 1^3 + - 5^3 + 3^3 = 1 + 125 + 27 = 153

- 154 is not an Armstrong number, **because**: 154 != 1^3 + 5^3 + 4^3 = 1 + 125 + 64 = 190

> Crear una funcion que recibirá un entero y retornara, true, si es un Armstrong number y false si este no lo es

- :fire: :fire: consta de 2 niveles

  - el 1: donde recibiraś en tu funcion un array de digitos que forman un solo numero, ejemplo: 153 = [1,5,3]
  - el 2: donde lo haces con el numero **entero** xd

- Al completar se les darán **stickers** , gracias a horchatajs :heart_eyes:!!

## Probemos

- num = 1000
  - lng = 4
  - 1 0 0 0
  - 1^4 + (0^4)\*3 => 1
  - result: 1000 == 1 => false

- num = 128
  - lng = 3
  - 1 2 8
  - 1^3 + 2^3 + 8^3 => 521
  - result: 521 == 128 => false

- num = 1634
  - lng = 4
  - 1^4 + 6^4 + 3^4 + 4^4 => 1634
  - result: 1634 == 1634 => true
