const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) =>{


        if( !data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            })
        }

        client.join(data.sala);

        usuarios.agregarPersona( client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala) );
        
        callback(usuarios.getPersonasPorSala( data.sala ));
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona( client.id );

        let mensaje = crearMensaje( persona, data.mensaje );
        client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje )

    });


    client.on('disconnect', () => {

       let personaDesconectada = usuarios.borrarPersona( client.id );

        client.broadcast.to(personaDesconectada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaDesconectada.nombre } se desconecto`));
        client.broadcast.to(personaDesconectada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaDesconectada.sala) );
    });


    //Mensajes privados
    client.on('mensajePrivado', data => {
        
        let persona =  usuarios.getPersona( client.id );
        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );

    });

});