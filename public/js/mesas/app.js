
(function () {

    'use strict';

    var byId = function (id) {
        return document.getElementById(id);
    },
            loadScripts = function (desc, callback) {
                var deps = [], key, idx = 0;

                for (key in desc) {
                    deps.push(key);
                }

                (function _next() {
                    var pid,
                            name = deps[idx],
                            script = document.createElement('script');

                    script.type = 'text/javascript';
                    script.src = desc[deps[idx]];

                    pid = setInterval(function () {
                        if (window[name]) {
                            clearTimeout(pid);

                            deps[idx++] = window[name];

                            if (deps[idx]) {
                                _next();
                            } else {
                                callback.apply(null, deps);
                            }
                        }
                    }, 30);

                    document.getElementsByTagName('head')[0].appendChild(script);
                })()
            },
            console = window.console;

    [].forEach.call(byId('wrapper').getElementsByClassName('asigna_mesas_1'), function (el) {
        Sortable.create(el, {
            group: {
                name: 'mesas',
                put: ["mesas", "mesas_generadas"]
            },
            animation: 150,
            filter: ".js-remove",
            onFilter: function (evt) {
                var id = evt.item.id.split('-');
                var contenedor = evt.item.parentNode.id.split('-');

                var item = evt.item,
                        ctrl = evt.target;


                if (Sortable.utils.is(ctrl, ".js-remove")) {
                    item.parentNode.removeChild(item);

                    arrayMesas.forEach(function (arr, index, object) {
                        if (arr.mesa === id[0] && arr.sillas === id[1] && arr.tipo === id[2]) {
                            object.splice(index, 1);

                            $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), esMediaLuna($('#media_luna'))));
                        }
                    });
                    autoGuardar();
                }


            },
            onEnd: function (evt) {

                var id = evt.item.id.split('-');
                var contenedor = evt.item.parentNode.id.split('-');

                arrayMesas.forEach(function (arr) {
                    if (arr.mesa === id[0] && arr.sillas === id[1] && arr.tipo === id[2]) {
                        arr.contenedor = contenedor[0];
                        arr.columna = contenedor[1];
                        arr.fila = contenedor[2];
                    }
                });

                $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), esMediaLuna($('#media_luna'))));
                autoGuardar();
            }
        });
    });

    Sortable.create(generador_sillas, {
        group: {
            name: 'mesas_generadas',
            pull: 'clone'
        },
        animation: 150,
        onEnd: function (evt) {
            if (evt.item.parentNode.id != "generador_sillas") {
                arrayMesas.push(creaObjMesa(evt));
                $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), esMediaLuna($('#media_luna'))));
                autoGuardar();
            }

        }
    });


    $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), 1));

    function generarMesa(no_sillas, no_mesa, tipo_mesa) {

        var continuar = true;
        var mesa = "";

        arrayMesas.forEach(function (arr) {
            if (arr.mesa === no_mesa) {
                continuar = false;
            }
        });

        if (continuar) {

            var silla = 1;
            mesa += '<div id="' + no_mesa + '-' + no_sillas + '-' + tipo_mesa + '" class="contenedor_mesa">' +
                    '<div class="js-remove">✖</div>' +
                    '<div class="mesa">' + no_mesa + '</div>';

            if (tipo_mesa == "1") {
                var value = 360 / no_sillas;
                for (var i = 0; i < 360; i = i + value) {
                    mesa += '<div  class="sillas_contenedor" style="transform:rotateZ(' + i + 'deg);"><div class="silla" id="mesa-' + no_mesa + '-silla-' + silla + '"></div></div>';
                    silla++;
                }
            }

            if (tipo_mesa == "2") {
                value = 180 / no_sillas;

                for (i = 0; i < 180; i = i + value) {

                    var grados = i + 110;

                    switch (no_sillas) {
                        case 1:
                            grados = i + 180;
                            break;
                        case 2:
                            grados = (i + 110 + 45);
                            break;
                        case 3:
                            grados = (i + 110 + 30);
                            break;
                        case 4:
                            grados = (i + 110 + 20);
                            break;
                        case 5:
                            grados = (i + 110 + 18);
                            break;
                        case 6:
                            grados = (i + 110 + 16);
                            break;
                        case 7:
                            grados = (i + 110 + 14);
                            break;
                        case 8:
                            grados = (i + 110 + 12);
                            break;
                        case 9:
                            grados = (i + 110 + 10);
                            break;
                        case 10:
                            grados = (i + 110 + 8);
                            break;
                        case 11:
                            grados = (i + 110 + 6);
                            break;
                    }
                    mesa += '<div  class="sillas_contenedor" style="transform:rotateZ(' + grados + 'deg);"><div class="silla" id="mesa-' + no_mesa + '-silla-' + silla + '"></div></div>';
                    silla++;
                }
            }
        } else {

            mesa += '<div class="alert alert-warning" style="margin-bottom:0px;" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Este identificador de mesa ya fue utilizado!<br/> cambielo para poder generar la mesa.</div>';

        }

        return mesa += '</div>';
    }

    //MODAL SOBRE MESA
    $(document).on("click", ".contenedor_mesa", function () {
        var id = $(this).attr('id').split('-');
        var data = new Object();
        $("#tabla_sillas_mesa").bootstrapTable('removeAll');
        arrayInvitados.forEach(function (arr, index, object) {
            if (arr.mesa === id[0]) {
                $("#tabla_sillas_mesa").bootstrapTable('append', arr);
            }
        });
        $("#descripcion_mesas_modal").modal("show");
        $("#descripcion_mesas_titulo").html("Mesa: " + id[0]);
    });


    //MODAL ASIGNACION AUTOMATICA
    $(document).on("click", "#boton_asignacion_automatica", function () {
        $("#asigna_automatico").modal("show");
    });

    //ASIGNAR AUTOMATICAMENTE
    $(document).on("click", "#asignar_automaticamente", function () {
        event.preventDefault();

        var count1 = $('input[type=checkbox]:checked.checkMesas').length;
        var count2 = $('input[type=checkbox]:checked.checkCat').length;


        if (count1 > 0 && count2 > 0) {
            $("#asignar_automaticamente").hide();
            $.post("mesas/asignarAuto",
                    {
                        params: $("#asignar").serialize()
                    },
                    function (data, status) {

                        if (status == "success") {
                            location.reload();
                            //console.log(data,status);
                        }
                    });
        } else {
            alert("Debe Seleccionar al menos 1 mesa y 1 categoria");
        }


    });

    $("#ckbCheckAllMesas").click(function () {
        $(".checkMesas").prop('checked', $(this).prop('checked'));
    });

    $("#ckbCheckAllCat").click(function () {
        $(".checkCat").prop('checked', $(this).prop('checked'));
    });


    $("#no_sillas, #no_mesa, #media_luna").bind('keyup mouseup click', function () {
        $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), esMediaLuna($('#media_luna'))));
        sorterSillas();
    });


    sorterSillas();

    function esMediaLuna(check) {
        var tipo = 1;
        if (check.is(":checked")) {
            tipo = 2;
        }
        return tipo;
    }

    function sorterSillas() {
        [].forEach.call(byId('wrapper').getElementsByClassName('silla'), function (el) {
            Sortable.create(el, {
                group: 'sillas',
                animation: 150,
                onEnd: function (evt) {
                    var id = evt.item.id;
                    var contenedor = evt.item.parentNode.id.split('-');
                    var contenedor2 = evt.item.parentNode.parentNode.parentNode.parentNode.id.split('-');

                    if (contenedor != evt.from.id && contenedor2 != "generador_sillas") {
                        arrayInvitados.forEach(function (arr) {
                            if (arr.codigoBarras === id) {

                                if (contenedor == "contenedor_asignacion_manual") {
                                    arr.mesa = "9999";
                                    arr.silla = "1";
                                } else {
                                    arr.mesa = contenedor[0];
                                    arr.silla = contenedor[1];
                                }
                            }
                        });
                        autoGuardarInvitados();
                    }


                }
            });
        });
    }

    function creaObjMesa(evt) {
        var id = evt.item.id.split('-');
        var contenedor = evt.item.parentNode.id.split('-');

        var objeto = {};
        objeto["mesa"] = id[0];
        objeto["sillas"] = id[1];
        objeto["tipo"] = id[2];
        objeto["contenedor"] = contenedor[0];
        objeto["columna"] = contenedor[1];
        objeto["fila"] = contenedor[2];

        return objeto;
    }

    function autoGuardar() {
        var values = {};
        values.arrayMesas = {};

        arrayMesas.forEach(function (item, index) {
            values.arrayMesas[index] = item.mesa + "," + item.sillas + ","
                    + item.tipo + "," + item.contenedor + "," + item.columna + "," + item.fila;
        });

        $.post("mesas/agregar",
                {
                    params: values
                },
                function (data, status) {
                    if (status == "success") {
                        $('#alert_auto_guardado').fadeIn('fast', function () {
                            $(this).delay(1500).fadeOut('fast');
                        });
                    }
                });

    }



    function autoGuardarInvitados() {
        var values = {};
        values.arrayInvitados = {};

        arrayInvitados.forEach(function (item, index) {
            if (item.mesa != "9999") {
                values.arrayInvitados[index] = item.mesa + "," + item.silla + "," + item.codigoBarras;
            }
        });

        $.post("mesas/actualizar",
                {
                    params: values
                },
                function (data, status) {
                    if (status == "success") {
                        $('#alert_auto_guardado').fadeIn('fast', function () {
                            $(this).delay(1500).fadeOut('fast');
                        });
                    }
                });
    }

})();