$(document).ready(() => { //ejcuta el código una vez cargado todo el dom

    /*
    FUNCIÓN PARA AGREGAR UN NUEVO PROYECTO
    */
    $('#add').on('click', () =>{//al hace click en el btn con id 'add' se efecuta el código que le sigue
        let nombre = $('#proyecto').val(); //recoge y alamcena el nombre del proyecto del input con id 'proyecto' y con val() se recoge el valor del input(el texto en si)
        if(nombre){//si es true, es decir, tiene un valor no está vacío
             //crea un bloque de elementos html para mostrar el proyecto y los input y botones para agregar las tareas dentro del proyecto
            let proyectoInfo = $(`
                <li class="proyecto"> <!-- un elemento li para cada proyecto -->
                    <h2 class="nombre">${nombre}</h2> <!-- mostar el nombre del proyecto -->

                    <input type="text" class="inputTarea" placeholder="Nombre de la tarea"> <!-- input para nombre de nueva tarea -->
                    <!-- Botones para eliminar proyecto y agregar tarea -->
                    <button class="agregar">Agregar Tarea</button>
                    <button class="eliminar">Eliminar Proyecto</button>

                    <!--lista donde iran las tareas de cada proyecto -->
                    <ul class="listaTareas"></ul>
                </li>
                `);
                $('#lista').append(proyectoInfo); //agrega el bloque creado antes en la lista en el html con id 'lista'
                $('#proyecto').val(''); //limpia el campo del nombre del proyecto, su valor, val()
        }
    });

    /*
    *   FUNCIÓN PARA ELIMINAR EL PROYECTO
    */
   //se selecciona la lista con id 'lista' cuando se hace click en el botón con la clase .eliminar (de dentro del proyecto)
    $('#lista').on('click', '.eliminar', function() {
        //al usar this se selecciona solo el botón ene l que se hizo click y no todos los elementos de la misma clase, la calse .eliminar
        $(this).parent().remove(); //con parent() se elimina el elemtno padre del botón eliminar que es el elemento <li> , por tanto s eelimina todo el bloque

    });

    /*
    *FUNCIÓN PARA EDITAR EL NOMBRE DEL PROYECTO
    */
   $('#lista').on('dblclick', '.nombre', function(){//selecciona el elemento lista con id 'lista' 
    //al hacer dobleclick en el elemento html que tiene la clase 'nombre' se ejecuta la función

    let nombreProyecto =  $(this);//almacena el elemento html donde se hizo dobleclick, es decir, ene el títulio del proyecto
    //this se refiere al elemento html en el que ocurrió el evento 
    let nombreActual = nombreProyecto.text(); //obtiene el contenido del h2 (el texto escrito), que se ha almacenado en nombreProyecto antes
    let input = $('<input type="text"  >').val(nombreActual); //crea un nuevo input para poder modificar el nombre y se le añade el valor(val())  del nombreActual qeu es el que se ha recogido , el que tenía inicialmente
    
    nombreProyecto.replaceWith(input);//después de haber escrito en el input se utiliza el replaceWith() para cambiar el nombre inicial almacenado en 'nombreProyecto' por el nuevo almacenado en 'input'
   

    //agregar el evento keydown para que al presionar enter se actualize el nuevo nombre del proyecto sin necesidad de apretar ningún boton
    input.on('keydown', function(e){
        if(e.key === 'Enter'){ //verifica que se ejecute el código solamente si se ha presionado la tecla 'enter'
            let nuevoNombre = input.val();//obtiene el texto del input donde antes se ha escrito para modificar su valor
            input.replaceWith(`<h2 class="nombre">${nuevoNombre}</h2>`); //remplaza el texto del elemento h2 con el valor de input que se ha alamcenado en la variable 'nuevoNombre'
        }
        
    });
   });

   /*
   *
   */


})


//FUNCIONES

