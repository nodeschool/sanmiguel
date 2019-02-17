
Vue.component('contenido' , {
    data : function() {
       return {
           sistemas : [
               'binario' ,
               'hexadecimal' ,
               'romano',
               'decimal'
           ] ,
           origen : '' ,
           final : ''
       }
    } ,
    template : `
        <div>
            
            <div class="container ">
                <div class="card bg-secondary mt-5 pt-2 pb-3">           
                    <div class="row">
                   
                        <div class="col-6 col-lg-3 offset-lg-3 pl-5">
                            <label for="optios" >Sistema de origen  </label>
                            <select class="form-control" id="option" @change="selectOrig" v-model="origen">
                                <!-- <option selected disabled>escoge un sistema</option> -->
                                <option v-for="sistema in sistemas" > {{sistema}} </option>                                           
                            </select>
                        </div>
                        <div class="col-6 col-lg-3 pr-5">
                            <label for="optios">Sistema a convertir</label>
                            <select class="form-control" id="option" :disabled="origen == ''"  v-model="final">
                            <!-- <option selected disabled>escoge un sistema</option> -->
                                <option v-for="sistema in sistemas" :disabled="origen == sistema"> {{sistema}} </option>
                                
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    ` ,
    methods : {
        selectOrig : function() {
            this.final = ''
        } 
    },
    updated() {
        this.$emit('selection' , this.origen , this.final )
    }
} )

Vue.component( 'tablero', {
    props : [ 'system' ] ,
    data : function() {
        return {
            number : '' ,
            isValid : false ,
            options : {
                binario : [
                    [ '0' , '1']
                 ] ,
                hexadecimal : [ 
                    [ '0' , '5' , 'A' ] ,
                    [ '1' , '6' , 'B' ] ,
                    [ '2' , '7' , 'C' ],
                    [ '3' , '8' , 'D' ] ,
                    [ '4' , '9' , 'E' ] ,
                    [ 'F' ] 
                ] ,
                decimal : [
                    [ '7' , '4' , '1' ] ,
                    [ '8' , '5' , '2' ] ,
                    [ '9' , '6' , '3' ] , 
                    [ '0' ]                    
                ] , 
                romano : [
                    [ 'I' , 'C' ,  ] ,
                    [ 'V' , 'D' , ] ,
                    [ 'X' , 'M' , ] ,
                    [ 'L'  ]
                ]
            }
        }
    } ,
    template : `
        <div class="card bg-dark pt-3">
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-sm-10 col-lg-6 offset-sm-1 offset-lg-3">
                              <input type="text" class="form-control text-center" id="number" v-model="number" disabled/>
                            </div>
                        </div>
                        <hr/>
                        <div class="row ">
                            <div class="col-7 col-7 offset-1 text-center">
                                <div :class="( system == 'binario' ) ? 'btn-group' : 'btn-group-vertical' " class=" text-center mb-1" role="group" aria-label="Basic example" v-for="buttons in options[system]">
                                    <button class=" btn btn-dark btn-lg" v-for="button in buttons" @click="write(button)">{{button}}</button>                                    
                                </div>
                               
                            </div>
                            <div class="col-3 col-3 ">
                                <div :class="( system == 'binario' ) ? 'btn-group' : 'btn-group-vertical' "role="group" aria-label="Basic example">
                                    <button class=" btn btn-info text-dark btn-lg " @click="del">del</button>
                                    <button class=" btn btn-danger btn-lg mr-2" @click="clear">C</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods : {
        write : function(num){
            this.number += num
        },
        del : function(){
            this.number = this.number.substring(0,this.number.length-1)
        }, 
        clear : function(){
            this.number = ''
        } , 
        change : function() {
            switch ( this.system ) {
                case 'binario' :
                case 'decimal' :
                case 'hexadecimal' :
                
                    this.malInicio()
                    break ;
                case 'romano' :
                    this.isRoman() 
                    break 
            }
        } ,
        malInicio : function(){
            if ( this.number[0] == '0' || this.number == '' ) { 
                this.isValid = false 
            } else { 
                this.isValid = true
            }
        } , 
        isRoman : function () {
            
            if( this.number.search(/[dlxvi]+m|[lxvi]+d|[lvi]+c|[vi]+l|[v]+x|cmc|cdc|xcx|xlx|ixi|ivi|i{4,}|v{4,}|x{4,}|l{4,}|c{4,}|d{4,}|m{4,}|l{2,}|v{2,}|d{2,}|x{2,}l|i{2,}v|i{2,}x|x{2,}c|c{2,}d|c{2,}m/i) !=-1){
                this.isValid = false ;
                console.log('incorrecto')
            } else {
                this.isValid = true ;
                console.log('correcto')
            }
        }

    } ,
    updated() {
        this.change()
        this.$emit('change' , this.number , this.isValid )
    }
} )


let app = new Vue({
    el: '#app' ,
    
    template : `
        <div>
        <div class="container"> 
            <contenido @selection="config"></contenido>
            <hr/>
            <div class="row" v-if="to != ''" > <!-- v-if="to != ''"-->
                <div class="col-sm-12 col-lg-5">
                    <tablero :system="from" @change="change" ></tablero>
                </div>
                <div class="col-sm-12 col-lg-1 text-center">
                    <button class="btn btn-primary mt-5 " @click="translate" :disabled="!isValid">></button>
                </div>
                <div class="col-sm-12 col-lg-6 mt-5">
                    <div class=" bg-warning text-white text-center pt-5 pb-5 pl-3 mt-2 h1">
                         {{ result }}
                    </div>
                </div>
            </div>
            
            <div class="row" v-else> <!-- v-else-->
                <div class="card col-12 text-center text-warning bg-dark pt-4">
                    <h2>Esperando la configuracion</h2>
                    <div class="sk-wave">
                        <div class="sk-rect sk-rect1 bg-warning" ></div>
                        <div class="sk-rect sk-rect2 bg-warning"></div>
                        <div class="sk-rect sk-rect3 bg-warning"></div>
                        <div class="sk-rect sk-rect4 bg-warning"></div>
                        <div class="sk-rect sk-rect5 bg-warning"></div>
                    </div>
                </div>
            </div>
            <!--
            nombre : <input class="pl-2" type="text" autofocus="true" v-model="nameSearch" /> 
            <button class="btn" @click="compare">
                comprobar
            </button>

            <div class="sk-wave" v-if="search && persona.nombre">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
             </div>

            <div class="card pl-4" v-if="persona.nombre" >
                <div v-if="nameSearch == persona.nombre"> 
                    nombre : {{persona.nombre}} <br/>
                    apellido : {{persona.apellido}}
                </div>
                <div class="text-danger" v-else>
                    El nombre no pertenece a la persona buscada
                </div>
            </div>
            -->
            </div>
        </div>
    ` , 
    data : {
        persona : {} ,
        search : false ,
        nameSearch : 'Erick',
        from : '' ,
        to : '' ,
        original : '' ,
        result : '' ,
        isValid : false ,
        result : '' 
    } , 
    methods: {
        compare : function() {
            this.search = true
            this.$http.get('json/prueba.json').then(function(response){
                this.persona = response.body 
                this.search = false
            } , function(){
                alert("Error intentar coger el dato")
            } )
        } ,
        config : function( from , to ){
           this.from = from 
           this.to = to
           this.result = ''
        } ,
        change : function( num , state ){       
           this.original = num
           console.log(this.original)
           this.isValid = state
        } ,
        translate : function(){
            
            this.result = fabrica( this.original , this.from , this.to )
        }
    },
    update () {

    }
}) 
 