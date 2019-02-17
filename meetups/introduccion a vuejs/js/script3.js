const app = new Vue({
    el: '#app',
    template: `
        <div>
            <h1 v-if="show"> {{ title }} </h1>
            <input type="text" v-model="title"/>
            <ul>
                <li v-for="persona in personas" >
                    <p>nombre: {{persona.nombre}} <br/> apellido: {{persona.apellido}} <br/>edad: {{persona.edad}} </p>
                </li>
            </ul>
            <button @click="action">haz click</button>
        </div>
    `,
    data: ({
        title: 'hola nodeschool',
        show: false,
        personas : [
            { nombre: 'erick' , apellido: 'saravia', edad : 20 },
            { nombre: 'Edgar' , apellido: 'Reyes', edad : 19 }
        ]
    }),
    methods: {
        action: function() {
            this.show = !this.show;
        }
    }
})