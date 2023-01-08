function limpiarForm() {
    //inputs
    document.getElementById('name-event').value = "";
    document.getElementById('fecha-evento').value = "";
    document.getElementById('descripcion').value = "";

    swal("Clean", "se limpiaron las casillas", "success");
}

let formEventos = document.getElementById('formEventos');

(() => {
    formEventos.addEventListener('submit', registrar);
})();

function registrar(e) {
    e.preventDefault();
    let nombre = document.getElementById('name-event').value;
    let fecha = document.getElementById('fecha-evento').value;
    let descripcion = document.getElementById('descripcion').value;

    let tipoEvento = $('input:radio[name=evento]:checked', '#formEventos').val();
    let evento = {
        nombre,
        fecha,
        descripcion,
        tipoEvento
    }
    if (localStorage.getItem('eventos') === null) {
        let eventos = [];
        eventos.push(evento);
        localStorage.setItem('eventos', JSON.stringify(eventos));
    } else {
        let eventos = JSON.parse(localStorage.getItem('eventos')); //recibo el string y lo paso  a objeto
        eventos.push(evento);
        localStorage.setItem('eventos', JSON.stringify(eventos));
    }
    getEventos();
    document.getElementById('formEventos').reset();
    swal("EVENTO CREADO", nombre, "success");
}

function getEventos() {
    let eventos = JSON.parse(localStorage.getItem('eventos')); // obteniendo los eventos del localstorage
    document.getElementById('numEvents').innerHTML = eventos.length; //numero total de eventos
    let fechas = [];
    let eventosVista = document.getElementById('cards-eventos');
    eventosVista.innerHTML = ``;
    for (let i = 0; i < eventos.length; i++) {
        let nombre = eventos[i].nombre;
        let fecha = eventos[i].fecha;
        let tipoEvento = eventos[i].tipoEvento;
        let descripcion = eventos[i].descripcion;
        fechas.push(fecha);

        eventosVista.innerHTML += `<div class="card-evento">
        <div class="datos">
            <h6>${nombre}</h6>
            <span><small><i> <b>${tipoEvento}</b> </i></small></span>
            <span><small><i> · ${fecha} </i></small></span>
        </div>
        <div class="btns-crud">
            <button class="btn-update" onclick="editar('${nombre}')">Actualizar</button>
            <button class="clear" onclick="deleteEvent('${nombre}')">Eliminar</button>
        </div>
    </div>`;
    }
    //fecha proxima

    let min = fechas[0];

    for (let i = 0; i < fechas.length; i++) {
        if (fechas[i] < min) {
            console.log('minimo: ' + min + ', nuevo minimo: ' + fechas[i]);
            min = fechas[i];
        }
    }
    console.log('fecha mínimo: ' + min);

    document.getElementById('fechaProx').innerHTML = min; //dando valor


}
getEventos();

function deleteEvent(title) {
    let eventos = JSON.parse(localStorage.getItem('eventos'));
    for (let i = 0; i < eventos.length; i++) {
        if (eventos[i].nombre == title) {
            eventos.splice(i, 1);
        }
    }

    localStorage.setItem('eventos', JSON.stringify(eventos));
    getEventos();
}

function editar(titulo) {
    console.log(titulo);

    let eventos = JSON.parse(localStorage.getItem('eventos'));

    for (let index = 0; index < eventos.length; index++) {

        if (eventos[index].nombre == titulo) {

            document.getElementById("form").innerHTML = `<form id="updateForm">
            <h3>EVENTO</h3>
            <input type="text" value="${eventos[index].nombre}" id="name-event" >
            <br>
            <input type="date" value="${eventos[index].fecha}" id="fecha-evento" >
            <br>
            <!--radios button-->
            <div class="radios">
                <input type="radio" id="privado" name="eventoUp" value="privado">
                <label for="html">Privado</label>
                <br>
                <input type="radio" id="publico" name="eventoUp" value="publico">
                <label for="css">Publico</label>
                <br>
                <input type="radio" id="vip" name="eventoUp" value="vip">
                <label for="vip">VIP</label>
            </div>
            <!--textarea-->
            <textarea name="desc-evento" id="descripcion" cols="30" rows="10" >${eventos[index].descripcion}</textarea> <br>
            <div class="btn">
                <button id="pps" class="submit" onclick="updateEvent('${index}')">Actualizar</button>
                <input type="button" class="submit" onclick="newEvent()" value="Nuevo evento">
            </div>
        </form>`;
        }
    }

}

function newEvent() {
    document.getElementById('form').innerHTML = `<form id="formEventos">
    <h3>EVENTO</h3>
    <input type="text" placeholder="nombre del evento" id="name-event" required>
    <br>
    <input type="date" placeholder="fecha" id="fecha-evento" required>
    <br>
    <!--radios button-->
    <div class="radios">
        <input type="radio" id="privado" name="evento" value="privado">
        <label for="html">Privado</label>
        <br>
        <input type="radio" id="publico" name="evento" value="publico">
        <label for="css">Publico</label>
        <br>
        <input type="radio" id="vip" name="evento" value="vip">
        <label for="vip">VIP</label>
    </div>
    <!--textarea-->
    <textarea name="desc-evento" id="descripcion" cols="30" placeholder="descripcion del evento" rows="10" required></textarea> <br>
    <div class="btn">
        <button type="submit" id="pps" class="submit">Registrar</button>
        <input type="button" class="clear" onclick="limpiarForm()" value="Limpiar">
    </div>
</form>`;
}

function updateEvent(i) {
    console.log(i);

    let eventos = JSON.parse(localStorage.getItem('eventos'));
    eventos[i].nombre = document.getElementById("name-event").value;
    eventos[i].fecha = document.getElementById("fecha-evento").value;
    eventos[i].tipoEvento = $('input:radio[name=eventoUp]:checked', '#updateForm').val();
    eventos[i].descripcion = document.getElementById("descripcion").value;

    localStorage.setItem('eventos', JSON.stringify(eventos));
    getTasks();
    newEvent();
}



document.getElementById('info').addEventListener('click', reaccion);
document.getElementById('github').addEventListener('click', git);
document.getElementById('logo').addEventListener('click', refreshCrud);

function reaccion(e) {
    e.preventDefault();
    swal("Que le parecio el crud?", {
            buttons: {
                dangerMode: "Aceptable",
                catch: {
                    text: "Funcional",
                    value: "catch",
                },
                Defectuoso: true,
            },
        })
        .then((value) => {
            switch (value) {

                case "Defectuoso":
                    swal("en mejora +,gracias");
                    break;

                case "catch":
                    swal(".", "Gracias por su opinion", "success");
                    break;

                default:
                    swal("Gracias por revisar");
            }
        });
}

function git(e) {
    e.preventDefault();
    window.location.href = "https://github.com/omargpx";
}

function refreshCrud(e) {
    e.preventDefault();
    window.location.href = "index.html";
}
