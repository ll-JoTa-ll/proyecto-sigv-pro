//evento target
document.onclick = function(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    var modal = document.getElementById('pop1');
    var texto = document.getElementById('habitacion');
    var destino = document.getElementById("txtdestino ");
    var ciudades = document.getElementById("divwebCompAirport ");
    var origenbus = document.getElementById("txtorigen ");
    var destinobus = document.getElementById("txtdestino ");
    var ciudadesbus = document.getElementById("divCity ");
    var ciudadesbus2 = document.getElementById("divCitydestino ");
    var fecha1 = $("#txtDateCheckIn ").val();
    var fecha2 = $("#txtDateCheckOut ").val();
    do {
        if (modal === target || texto === target || destino === target || ciudades === target || origenbus === target || destinobus === target || ciudadesbus === target || ciudadesbus2 === target || 'btnRemove_0' === event.target.id ||
            'btnRemove_1' === event.target.id || 'btnRemove_2' === event.target.id || 'btnRemove_3' === event.target.id ||
            'btnRemove_4' === event.target.id) {
            return;
        }
        target = target.parentNode;
    } while (target);
    //document.getElementById("pop1 ").style.display = "none ";

    $("#pop1 ").hide();
    $("#divwebCompAirport ").hide();
    $("#divCity ").hide();
    $("#divCitydestino ").hide();
}

//* funciones modal agregar habitaciones
$(document).on('click', '.number-spinner button', function() {
    var btn = $(this),
        oldValue = btn.closest('.number-spinner').find('input').val().trim(),
        newVal = 0;
    if (btn.attr('data-dir') == 'up') {
        newVal = parseInt(oldValue) + 1;
        var result = 0;
        var adultos = parseFloat(document.getElementById("txtpersonas").value);
        result = adultos + 1;
        document.getElementById("txtpersonas").value = result;
    } else {
        if (oldValue > 1) {
            var adultos = parseFloat(document.getElementById("txtpersonas").value);
            newVal = parseInt(oldValue) - 1;
            var result = 0;
            var adultos = parseFloat(document.getElementById("txtpersonas").value);
            result = adultos - 1;
            document.getElementById("txtpersonas").value = result;
        } else {
            newVal = 1;
        }
    }
    btn.closest('.number-spinner').find('input').val(newVal);
});

function MostrarModal() {
    $("#pop1").show();
}

function AddHabitaciones(position) {
    if (position === 4) {
        return;
    }
    var sum = 0;
    const newComponent = parseInt(position) + 1;
    const oldComponent = parseInt(position) - 1;
    var content = "<div id='seccion_habitacion'>";
    content += "<div class='title-room'>";
    content += "<span>Habitacion #" + newComponent + "</span>";
    content += "<button id='btnRemove_" + oldComponent + "' onclick='RemoveHabitaciones(" + newComponent + ")' class='btn btn-danger delete'>Eliminar</button>"
    content += "</div>";
    content += "<hr>";
    content += "<div class='number-adults'>";
    content += "<span>Adultos</span>";
    content += "<div class='input-group number-spinner'>";
    content += "<span class='input-group-btn'>";
    content += "<button class='btn btn-danger' data-dir='dwn'><i class='fas fa-minus'></i></button>";
    content += "</span>";
    content += "<input readonly type='text' class='form-control text-center' value='1' id='txtadultos_" + newComponent + "'>";
    content += "<span class='input-group-btn'>";
    content += "<button class='btn btn-danger' data-dir='up'><i class='fas fa-plus'></i></button>";
    content += "</span>";
    content += "</div>";
    content += "</div>";
    content += "<hr>";
    content += "</div>";
    if (document.getElementById("btnRemove_" + (parseInt(oldComponent) - 1))) {
        document.getElementById("btnRemove_" + (parseInt(oldComponent) - 1)).classList.add("hidden");
    }
    var habitacionOption = document.getElementById("habitacion_" + newComponent);
    habitacionOption.innerHTML = content;
    document.getElementById("divbotones_" + position).style.display = "none";
    content = "<div id='habitacion_" + (parseInt(newComponent) + 1) + "'></div>";
    var newSepartorOption = document.createElement("div");
    newSepartorOption.setAttribute("id", "options_" + newComponent);
    content += "<div class='btn-agregar' id='divbotones_" + newComponent + "' style='display: block;'>";
    content += "<button class='btn btn-danger text-btn' onclick='AddHabitaciones(" + newComponent + ")'>Añadir habitacion</button>";
    content += "<button class='btn btn-danger añadir' onclick='Aplicar()'>Aplicar</button>";
    content += "</div>";
    newSepartorOption.innerHTML = content;
    habitacionOption.parentNode.insertBefore(newSepartorOption, habitacionOption.nextSibling);
    var personas = parseFloat(document.getElementById("txtadultos_" + newComponent).value);
    document.getElementById("txthabitacion").value = newComponent;
    var txt = parseFloat(document.getElementById("txtpersonas").value);
    sum = txt + personas;
    document.getElementById("txtpersonas").value = sum;



}

function RemoveHabitaciones(position) {
    var resta = 0;
    var canthab = 0;
    var habitaciones = parseFloat(document.getElementById("txthabitacion").value);
    var txtadulto = parseFloat(document.getElementById("txtadultos_" + position).value);
    var cantper = parseFloat(document.getElementById("txtpersonas").value);
    document.getElementById("divbotones_" + position).remove();

    if (position === 2 || position === 3 || position === 4 || position === 5) {
        document.getElementById("habitacion_" + position).innerHTML = "";
    }

    //if (document.getElementById("divbotones_" + (parseInt(position) - 1)) !== null && document.getElementById("divbotones_" + (parseInt(position) - 1)) !== undefined) {
    document.getElementById("divbotones_" + (parseInt(position) - 1)).style.display = "block";
    resta = cantper - txtadulto;
    document.getElementById("txtpersonas").value = resta;
    resta = habitaciones - 1;
    document.getElementById("txthabitacion").value = resta;

    if (position === 2) {
        return;
    } else {
        document.getElementById("btnRemove_" + (parseInt(position) - 3)).classList.remove("hidden");
    }


    //  } else {
    //     document.getElementById("divbotones_1").style.display = "block";
    //  }
}

function Aplicar(position) {
    $("#pop1").hide();

}