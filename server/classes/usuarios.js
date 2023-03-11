
class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = { id, nombre, sala };

        this.personas.push( persona );

        return this.personas;
    }

    getPersona( id ) {
        let persona = this.personas.filter( persona => persona.id === id)[0];//Solo regresa un registro con el [0], como un findbyid
    
        return persona;
    }

    getPersonas () {
        return this.personas;
    }

    getPersonasPorSala ( sala ) {
        let personasEnSala = this.personas.filter( persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id);//Obtenemos a quien vamos a borrar

        this.personas = this.personas.filter( persona => persona.id != id); //Con eso elimina y retorna un arreglo nuevo sin la persona 
    
        return personaBorrada;//Retorna los datos de la persona borrada
    }
    

}


module.exports = {
    Usuarios
}