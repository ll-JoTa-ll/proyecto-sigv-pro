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

function RequestServer(url, method, success, text) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json;');
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', 'eb85131bc9d94c02840aa6961e7f77e9');
    xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            success(xhr.response);
        }
    };
    if (text === null) xhr.send();
    else xhr.send(text);
}

var SendPost = function(url, success, text) {
    RequestServer(url, "post", success, text);
};

var SendGet = function(url, success) {
    RequestServer(url, "get", success);
};

function LoginXMLHTTPRequest(login, pass) {
    var loginRequest = new Object();
    loginRequest.User = login;
    loginRequest.Password = pass;
    var jsonRequest = JSON.stringify(loginRequest);
    SendPost("https://domiruth-uat.azure-api.net/security/Authenticate/LoginUser", ShowResult, jsonRequest);
}

function ShowResult(text) {
    var textParsed = JSON.parse(text);
    console.log(textParsed);
}


$(document).on("click", function(e) {

    var container = $("#hola");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        var z = document.getElementById("profile");
        z.style.display = "none";
    }
});



//* funciones modal agregar habitaciones
$(document).on('click', '.number-spinner button', function() {


    console.log("JOTA 1");

    var btn = $(this),
        oldValue = btn.closest('.number-spinner').find('input').val().trim(),
        newVal = 0;
    if (btn.attr('data-dir') == 'up') {
        console.log("JOTA 2 UP");
        newVal = parseInt(oldValue) + 1;
        var result = 0;
        var adultos = parseFloat(document.getElementById("txtpersonas").value);
        result = adultos + 1;
        document.getElementById("txtpersonas").value = result;

        var hdnCountAddHab = parseFloat($("#hdnCountAddHab").val());

        var adultos1 = parseFloat(document.getElementById("txtadultos_1").value);
        adultos1 = adultos1 + 1;
        if (adultos1 >= 6) {
            console.log("MAXIMOOOOO 6");
            //$("#btnUp_1").hide();
            $("#btnUp_1").prop("disabled", true);
        }

        if (hdnCountAddHab > 1) {
            var adultos2 = parseFloat(document.getElementById("txtadultos_2").value);
            adultos2 = adultos2 + 1;
            if (adultos2 >= 6) {
                console.log("MAXIMOOOOO 6");
                //$("#btnUp_1").hide();
                $("#btnUp_2").prop("disabled", true);
            }
        }

        if (hdnCountAddHab > 2) {
            var adultos3 = parseFloat(document.getElementById("txtadultos_3").value);
            adultos3 = adultos3 + 1;
            if (adultos3 >= 6) {
                console.log("MAXIMOOOOO 6");
                //$("#btnUp_1").hide();
                $("#btnUp_3").prop("disabled", true);
            }
        }

        if (hdnCountAddHab > 3) {
            var adultos4 = parseFloat(document.getElementById("txtadultos_4").value);
            adultos4 = adultos4 + 1;
            console.log("adultos4 ===>" + adultos4);
            if (adultos4 >= 6) {
                console.log("MAXIMOOOOO 6");
                //$("#btnUp_1").hide();
                $("#btnUp_4").prop("disabled", true);
            }
        }

    } else {
        if (oldValue > 1) {
            var adultos = parseFloat(document.getElementById("txtpersonas").value);
            newVal = parseInt(oldValue) - 1;
            var result = 0;
            var adultos = parseFloat(document.getElementById("txtpersonas").value);
            result = adultos - 1;
            document.getElementById("txtpersonas").value = result;

            var hdnCountAddHab = parseFloat($("#hdnCountAddHab").val());

            var adultos1 = parseFloat(document.getElementById("txtadultos_1").value - 1);
            if (adultos1 < 6) {
                console.log(btn);
                //$("#btnUp_1").show();
                $("#btnUp_1").prop("disabled", false);
            }

            if (hdnCountAddHab > 1) {
                var adultos2 = parseFloat(document.getElementById("txtadultos_2").value - 1);
                if (adultos2 < 6) {
                    console.log(btn);
                    //$("#btnUp_1").show();
                    $("#btnUp_2").prop("disabled", false);
                }
            }

            if (hdnCountAddHab > 2) {
                var adultos3 = parseFloat(document.getElementById("txtadultos_3").value - 1);
                if (adultos3 < 6) {
                    console.log(btn);
                    //$("#btnUp_1").show();
                    $("#btnUp_3").prop("disabled", false);
                }
            }

            if (hdnCountAddHab > 3) {
                var adultos4 = parseFloat(document.getElementById("txtadultos_4").value - 1);
                if (adultos4 < 6) {
                    console.log(btn);
                    console.log("adultos4 ====>" + adultos4);
                    //$("#btnUp_1").show();
                    $("#btnUp_4").prop("disabled", false);
                }
            }


        } else {
            newVal = 1;
        }
    }
    btn.closest('.number-spinner').find('input').val(newVal);
});



$('#validate').click(function() {

    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (regex.test($('#email1').val().trim())) {
        alert('Correo validado');

    } else {
        alert('La direccón de correo no es válida');
    }
});



$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

function MostrarModal() {
    $("#pop1").show();
}

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction1() {
    var x = document.getElementById("password1");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction2() {
    var x = document.getElementById("password2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function AddHabitaciones(position) {
    if (position === 4) {
        return;
    }
    var hdnCountAddHab = parseFloat($("#hdnCountAddHab").val());
    if (hdnCountAddHab > 1) {
        $("#btnRemove_0").prop("disabled", true);
    }
    if (hdnCountAddHab > 2) {
        $("#btnRemove_1").prop("disabled", true);
    }
    console.log("hdnCountAddHab ===>" + hdnCountAddHab);
    var sum = 0;
    const newComponent = parseInt(position) + 1;
    const oldComponent = parseInt(position) - 1;
    $("#hdnCountAddHab").val(newComponent);
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
    content += "<button class='btn btn-danger' data-dir='up' id='btnUp_" + newComponent + "'><i class='fas fa-plus'></i></button>";
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

    var hdnCountAddHab = parseFloat($("#hdnCountAddHab").val());
    $("#hdnCountAddHab").val("" + (hdnCountAddHab - 1));
    console.log("hdnCountAddHab ===> " + hdnCountAddHab);
    if (hdnCountAddHab < 4) {
        $("#btnRemove_0").prop("disabled", false);
    }
    if (hdnCountAddHab < 5) {
        $("#btnRemove_1").prop("disabled", false);
    }
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