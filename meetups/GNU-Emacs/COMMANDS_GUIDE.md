### Guía sobre teclas
- **M** = Alt
- **C** = Control
- **RET/RETURN** = Enter
- **Esc** = Escape
- **TAB** = Tabulación
- **SPACE** = Espacio

### Explicando combinaciones
- **M-x** = combinación de presionar Alt y tener presionado “x” al mismo tiempo, el guión significa que son al mismo tiempo
- **C-x b** = Tener presionado Control y “x”, luego dejar de presionarlas y presionar por separado la tecla “b”

## Listado de algunas acciones comunes con GNU Emacs
_*Algunos comando básicos_

- ###  Abrir - Guardar buffer

1. **C-x C-f** = Abrir buffer
2. **C-x C-s** = Guardar buffer

- ###  Escritorios dentro de Emacs
1. **M-x** = Activar shell de emacs
1. **M-x desktop-change-dir**= Ir hacia cierto archivo de escritorio
1. **M-x desktop-save-in-desktop-dir**= Guardar los buffers abiertos en el archivo de escritorio

_* Cuando se ejecuta la shell y no recuerdas el comando, puedes empezar a digitarlo y presionar la tecla TAB para que Emacs te lance coincidencias_

- ### Moverse dentro de los buffers

1. **C-f** = Moverse a la derecha
2. **C-b** = Moverse a la izquierda
3. **C-p** = Moverse hacia arriba una línea
4. **C-n** = Moverse hacia abajo una línea
5. **C-m** = Agregar una línea debajo de la línea posicionada
6. **C-d** = Borrar carácter del puntero posición hacia la izquierda, como la tecla Supr del teclado
7. **C-k** = Cortar una línea desde donde está el puntero hasta el final de esta
8. **C-l** = Que el buffer se alinee al inicio, al medio o al final del recuadro del buffer
9. **C-ESPACE** = Activa seleccionar texto dentro del buffer
10. **C-g** = Cancela el comando que se está digitando o haciendo
11. **M-w** = Copiar un texto seleccionado
12. **C-w** = Cortar texto seleccionado
13. **C-y** = Pegar texto seleccionado
14. **C-x h** = Seleccionar el contenido del buffer
15. **M-<** = Ir al inicio del buffer
16. **M->** = Ir al final del buffer
17. **C-s** = Buscar texto en el archivo
18. **M-%** = Buscar texto y reemplazarlo

- ### Acciones con los buffers

1. **C-x 2** = Partir el buffer hacia abajo
2. **C-x 3** = Partir el buffer hacia la izquierda
3. **C-x o** = Moverse entre los buffers
4. **C-x 0** = Cerrar el buffer que tiene el foco del puntero
5. **C-x C-b** = Ver el listado de buffers abiertos
6. **C-x b** = Ir a un buffer en específico digitando el nombre del buffer

- ### Acciones con los directorios

1. **M-x make-directory** = Crear directorio
2. **M-x rename-file** = Renombrar archivo

- ### Shell

1. **M-x shell** = Activar la shell, es decir la consola del S.O
***
## Uso de paquetes

Emacs nos permite personalizar con paquetes externos desarrollados por terceros, pero todo esto requiere de una cierta instalación, que no es muy complicada. 

Los paquetes en Emacs si eres usuario de GNU/Linux se almacenan en tu carpeta personal dentro de una carpeta que está oculta por defecto, el nombre de ésta carpeta es _".emacs.d/"_, en la cual dentro de ella tiene otra carpeta con el nombre _"elpa/"_, que es la carpeta que contiene todos los paquetes instalados, cada uno en su respectiva carpeta.

- ### Instalar paquete en Emacs

1. **M-x install-package <nombre-del-paquete> RET** = Digitar Alt+x luego digitar install-package y luego el nombre del paquete, una vez hecho eso, presionar la tecla ENTER

***
## Archivo de configuración de Emacs

Emacs tiene un archivo de configuración, en el cual se puede agregar todo lo deseado para personalizarlo. La ubicación de este archivo es en la carpeta personal y con el nombre de archivo oculto de _“.emacs”_, para acceder a el se puede digitar en consola o en la shell de Emacs para abrir un buffer como cualquier otro;

1. **C-x C-f ~/.emacs** = Abrir archivo de configuración de Emacs


***
## Modos de los buffers en Emacs
Emacs tiene la caracteristica de acoplarse según sea el contenido del buffer, a esto se le conoce como _modo_, existiendo el _Modo mayor_ & _Modo menor_.

Un modo puede brindar cierto compartamiento si es que está activado, por ejemplo se puede tener un _modo_ que justifique el contenido del buffer con un identado de 2 espacios, y activar otro modo en otro buffer que tenga un identado de 4 espacios, todo es personalizable.

Los modos hay en gran variedad, dependiendo del paquete que se haya instalado por X necesidad a la hora de digitar texto.

1. **M-x <nombre-del-modo>** = Habilita/Deshabilita un modo en Emacs

_*Emacs automáticamente verificará si el modo está activo o deshabilitado_

