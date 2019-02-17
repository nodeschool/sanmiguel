/* window.onload = init ;

function init() {
   // getRequest("pets.json")
   getRequest("pets.json")
}

function getRequest(file) {
    
    var request = new XMLHttpRequest() // crear un objeto tipo request 

    // estatus actual: 0 <=> UNSENT "open () no ha sido llamado"
    request.open( "GET" , file ) 

    // status actual: 1 = OPENED "open() ha sido llamado " 
    request.onreadystatechange = function () {
    // status 2, 3, 4 = HEADERS_RECEIVED, LOADING, DONE : "cabecera recibida", "cuerpo de la peticion recibida", "la peticion esta completa y lista para procesar"
        if ( this.readyState == this.DONE && this.status == 200 ) {
            if ( this.responseText != null ) {
               result = this.responseText 
               changeText("pets",this.responseText) 
               
            } else {
                result = "Mistale: responce is null!!"
            }
        } else {
            
    
            result = "Mistake: request no completed!!"
        }
        
    }
    
    request.send()
} 


function changeText( element , newText ) {
    document.getElementById(element).innerHTML = newText ;
}
*/

