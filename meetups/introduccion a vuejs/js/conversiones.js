
// :::::::::::::::::::. Binario a decimal

function binToDec (bin) {

    // declaracion de variables
    let result // almacenara la conversion
    

    // configuracion inicial de la variable 
    
    bin = String(bin).split("").reverse() // convertir el numero en una cadena de texto e invertir orden
    result = ( bin[0] == '1'  ) ?  1 :  0 // iniciar el acumulador en base al estado inicial del numero 
    

    // buscar las pociones activas en el arreglo ( su valor sea '1' )
    for ( let i = 1 ; i < bin.length ; i++ ) {
    
        // si la posicion esta activa
        if ( bin[i] != '0' ) {
           
            // sumar la potencia de 2 correspondiente a la pocion
            result +=  Math.pow( 2 , i );
        
        }
    
    }

    return result // devolver resultado

}


function decToBin( num , bin = '' ) {

    let rest // residuo de la division
    let div 

    
    num = Number( num )
    rest = num % 2
    div = Math.trunc( num / 2 )
    
    bin += String(rest)    

    if( div > 1 ) {
        
        bin = decToBin ( div , bin )
    } else {
        bin += '1'
        bin = bin.split("").reverse().join('')
    }


    return bin 
}

// ::::::::::::::::::::::::. Hexadecimal a decimal
function hexToDec( num  ) {
    let chars = '0123456789ABCDEF'
    num = num.split("").reverse()
    let result = chars.search(num[0])

    for (let i = 1; i < num.length; i++) {
       result += Math.pow( 16 , i ) * chars.search(num[i]) 
    }

   return result
}

// ::::::::::::::::::::::::. Decimal a hexadecimal
function decToHex( num , hex = '' , original = num) {

    // definicion de variables
    let chars = '0123456789ABCDEF' // caracteres a utilizar
    let div 
    let pot = 0

    num = Number( num )
    // hallar la mayor potencia de 16 menor al numero buscado
    for ( let i = num ; i > 15 ; i /= 16) {
        pot++
    }

    // identificar los multiplos de la potencia de 16 presentes en el numero
    div = Math.trunc( num / Math.pow( 16 , pot ) ) 
   
    // escribir el multiplo en notacion hexagesimal
    hex += String( chars[div] )

    // identificar el resto
    num -= Math.pow( 16 , pot ) * div 

    // si el resto es mayor que 16
    if ( num >= 16 ) {

        // llamar a nuevamente la funcion mandando como valor inicial de hex 
        // el valor actual de hex
        hex = decToHex( num , hex , original )
    
    } else {
        
        // hagregar el caracter corespondiente a la posicion del resto
        if ( original > 15 ) hex += chars[num]
    
    } 

    return hex // retornar el resto
 
}


// :::::::::::::::::. Decimal a Romano
function decToRoman( num ) {
    
    // declaracion de variables
    let system = [
        { rmn : 'M' , dec : 1000 } ,
        { rmn : 'CM' , dec : 900 } ,
        { rmn : 'D' , dec : 500 } ,
        { rmn : 'CD' , dec : 400 } ,
        { rmn : 'C' , dec : 100 } ,
        { rmn : 'XC' , dec : 90 } ,
        { rmn : 'L' , dec : 50 } ,
        { rmn : 'XL' , dec : 40 } ,
        { rmn : 'X' , dec : 10 } ,
        { rmn : 'IX' , dec : 9 } ,
        { rmn : 'V' , dec : 5 } ,
        { rmn : 'I' , dec : 1 } ,
    ]

    num = Number( num )

    let roman = '' // almacena la conversion
    let pos = 0 

    // definir rango de validez
    if ( num < 4000 ) {

        // verificar que caracter deñ sistema se anexara a la respuesta
        while ( pos < system.length  ) {
            
            // si el numero corresponde al rango de la posicion en el sistema ( de numeracion )
            if ( num >= system[pos].dec ) {

                // anexar el caracter
                roman += system[pos].rmn 

                // restar la cantidad actual representada en "roman"
                num -= system[pos].dec

            } else {
                pos++ // incrementar la posicion
            } 


        } 
        
    } else {
        roman = 'El numero que quieres convertir exede al permitido'
    }

    return roman // retornar valor

}

// :::::::::::::::::::::::. Romano a decimal

function romToDec( roman ) {
    
    // convertir el numero en un arreglo
    arr = roman.split("")
    ard = [] // arreglo que contendra sus equivalentes a los simbolos
    
    //convertir los caracteres en sus equivalentes numericas
    arn = arr.map( e => {
        
        // identificar que valor se retornara 
        switch(e){
            case "I": return 1; break
            case "V": return 5; break
            case "X": return 10; break
            case "L": return 50; break
            case "C": return 100; break
            case "D": return 500; break
            case "M": return 1000; break
        }

    } )

    // validar el arreglo
    for( let i = 0 ; i < arn.length ; i++ ){
       
        // si el numero es menor que el que le sigue
        if ( arn[i] < arn[i + 1 ] ) {

            // guardar el numero actual restado al siguiente
            ard.push( arn[ i + 1 ] - arn[ i ] )
            i++ // incrementar el contador ( ya que se utilizaron 2 posiciones )
       
        } else {

            ard.push( arn[ i ] ) // agregar a las respuestas e resultado
       
        }
    }
 
    decimal = eval( ard.join('+') )   
    return decimal
    
}


// CONVERSIONES A SISTEMA DECIMAL
const toDec = {
    binario : ( number ) => {
        return binToDec( number )
    } ,
    hexadecimal : ( number ) => {
        return hexToDec( number )
    } ,
    romano : ( number ) => {
        return romToDec( number )
    }
}

// CONVERSIONES DESDE SISTEMA DECIMAL
const fromDec = {
    binario : ( number ) => {
        return decToBin( number )
    } ,
    hexadecimal : ( number ) => {
        return decToHex( number )
    } ,
    romano : ( number ) => {
        return decToRoman( number )
    }
}

// aplicacion del patron de diseño fabrica
function fabrica( number , origen , destino ) {
    let result 

    

    if( origen != 'decimal' ){
        result = toDec[ origen ]( number )
    }

    if( destino != 'decimal' ){
        result = ( origen == 'decimal' ) ? fromDec[ destino ]( number ) : fromDec[ destino ]( result )
    }
    
    return result
}


function addSpaces( number , pos ){
    
    number = String(number).split("")
    for (let i = 1; i <= number.length; i += pos) {
       number[i] += 'L'
    }
    number = number.join("")
    return number
}

( function ( number , pos ) {
    console.log( number , addSpaces( number , pos ) )
} ) ( '1000110' , 4 )