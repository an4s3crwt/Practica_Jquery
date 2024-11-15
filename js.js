$(document).ready(() => { //ejcuta el código una vez cargado todo el dom

    /*
    FUNCIÓN PARA AGREGAR UN NUEVO PROYECTO
    */
    $('#add').on('click', () => {//al hace click en el btn con id 'add' se efecuta el código que le sigue
        let nombre = $('#proyecto').val(); //recoge y alamcena el nombre del proyecto del input con id 'proyecto' y con val() se recoge el valor del input(el texto en si)
        if (nombre) {//si es true, es decir, tiene un valor no está vacío
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
    $('#lista').on('click', '.eliminar', function () {
        //al usar this se selecciona solo el botón ene l que se hizo click y no todos los elementos de la misma clase, la calse .eliminar
        $(this).parent().remove(); //con parent() se elimina el elemtno padre del botón eliminar que es el elemento <li> , por tanto s eelimina todo el bloque

    });

    /*
    *FUNCIÓN PARA EDITAR EL NOMBRE DEL PROYECTO
    */
    $('#lista').on('dblclick', '.nombre', function () {//selecciona el elemento lista con id 'lista' 
        //al hacer dobleclick en el elemento html que tiene la clase 'nombre' se ejecuta la función

        let nombreProyecto = $(this);//almacena el elemento html donde se hizo dobleclick, es decir, ene el títulio del proyecto
        //this se refiere al elemento html en el que ocurrió el evento 
        let nombreActual = nombreProyecto.text(); //obtiene el contenido del h2 (el texto escrito), que se ha almacenado en nombreProyecto antes
        let input = $('<input type="text"  >').val(nombreActual); //crea un nuevo input para poder modificar el nombre y se le añade el valor(val())  del nombreActual qeu es el que se ha recogido , el que tenía inicialmente

        nombreProyecto.replaceWith(input);//después de haber escrito en el input se utiliza el replaceWith() para cambiar el nombre inicial almacenado en 'nombreProyecto' por el nuevo almacenado en 'input'


        //agregar el evento keydown para que al presionar enter se actualize el nuevo nombre del proyecto sin necesidad de apretar ningún boton
        input.on('keydown', function (e) {
            if (e.key === 'Enter') { //verifica que se ejecute el código solamente si se ha presionado la tecla 'enter'
                let nuevoNombre = input.val();//obtiene el texto del input donde antes se ha escrito para modificar su valor
                input.replaceWith(`<h2 class="nombre">${nuevoNombre}</h2>`); //remplaza el texto del elemento h2 con el valor de input que se ha alamcenado en la variable 'nuevoNombre'
            }

        });
    });

    /*
    *FUNCIÓN PARA AGREGAR TAREAS DENTRO DE UN PROYECTO
    */
    $('#lista').on('click', '.agregar', function () {//se ejcuta cuanddo se hace click a el botón con la clase de .agregar
        //Obtiene el elemento input para la nueva tarea
        //$(this) hace ref al botón que fue clickado para identificarlo
        //sibilings() selecciona el input que es hermano de ese boton agregar tarea
        //basandose en su clase(inputTarea), que está en el mismo bloque <li>
        let tareaInput = $(this).siblings('.inputTarea');

        //obtiene el valor , el texto que se ha escrito en el input mediante val()
        let nombreTarea = tareaInput.val();

        if (nombreTarea) {//si es true, es decir, no está vacío

            //crear el elemento <li> por cada tarea que se crea dentro de un proyecto
            //el bloqyue de código crea un elemento de lista <li> que incluye,:
            //--  título para mostrar el nombre de la tarea
            //-- botón para marcar la tarea como importante
            //-- botón para marcar la tarea como completada 
            let tarea = $(`
            <li class="tarea">
                <h3 class="nombreTarea">${nombreTarea}</h3>
                <button class="eliminarTarea">Eliminar Tarea</button>
                <button class="marcarImp">Importante</button>
                <button class="marcarCom">Completada</button>
            </li>    
        `);

            //agrega la tarea al elemento <ul> que se creó para cada proyecto
            //al utilizar $(this) se sigue haciendo ref al botón en el que se ha hecho click , que es el de agregar tarea
            //siblings(listaTareas) selecciona la lista <ul> con esa clase asociasda al proyecto en el que se acciona el botón de agregar tarea
            //siblings lo que hace es buscar el elemento <ul class="listaTareas"> que es hermano del botón agregarTareas
            //append() agregar la tarea que se ha creado (todo el bloque de código <li> anterior) a esta lista del proyecto
            $(this).siblings('.listaTareas').append(tarea);
            tareaInput.val(''); //limpiar el input de tarea

        }
    })


});


/*
* FUNCIÓN PARA RESALTAR TAREAS AL PASAR EL RATÓN
*/
$('#lista').on('mouseenter', '.tarea', function () {
    $(this).addClass('hovered'); //cuando el ratón se pasa sobre una tarea, se agregar la clase hovered a esa tarea , en el css le aplica un color
});

$('#lista').on('mouseleave', '.tarea', function () {
    $(this).removeClass('hovered');//cuando el ratón sale de la tarea, se elimina la clase que se le ha aplicado antes a esa tarea especifica
})




/*
* FUNCIÓN PARA MARCAR LAS TAREAS COMO IMPORTANTES
*/
$('#lista').on('click', '.marcarImp', function () {
    // $(this) hace referencia al botón en el que se hizo click
    // parent('.tarea') busca el elementopadre con la clase 'tarea' <li> ,del botón en el que se hizo click
    // toggleClass('importante') agrega o quita la clase 'importante' a la tarea
    // Esto cambia el estilo de la tarea, aplicando el estilo del CSS para '.importante'
    $(this).parent('.tarea').toggleClass('importante');
});

/*
* FUNCIÓN PARA MARCAR LAS TAREAS COMO COMPLETADAS
*/
$('#lista').on('click', '.marcarCom', function () {
    // $(this) hace referencia al botón en el que se hizo click
    // parent('.tarea') busca el elementopadre con la clase 'tarea' <li> ,del botón en el que se hizo click
    // toggleClass('completada') agrega o quita la clase 'completada' a la tarea
    // Esto cambia el estilo de la tarea, aplicando el estilo del CSS para '.completada'
    $(this).parent('.tarea').toggleClass('completada');
});

/*
* FUNCIÓN PARA ELIMINAR TAREAS
*/
 //se selecciona la lista con id 'lista' cuando se hace click en el botón con la clase .eliminarTarea (de dentro del proyecto)
$('#lista').on('click', '.eliminarTarea', function(){
     //al usar this se selecciona solo el botón ene l que se hizo click y no todos los elementos de la misma clase, la calse .eliminarTrea
$(this).parent().remove(); //con parent() se elimina el elemtno padre del botón eliminar que es el elemento <li> , por tanto s eelimina todo el bloque con remove()


});
