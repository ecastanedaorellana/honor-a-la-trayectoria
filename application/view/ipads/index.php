
<script>
    var arrayMesas = new Array();
    var arrayInvitados = new Array();
<?php
$i = 0;
$move = "";
foreach ($ubicaciones as $loop) {
    $descripcion = $loop->descripcion;
    $padre = $loop->padre_descripcion;
    $p_columna = $loop->padre_columna;
    $p_fila = $loop->padre_fila;

    if ($p_columna > 0 && $p_fila > 0) {
        $move.= '$(".' . $descripcion . '").parent(".tabla_localidad").detach().appendTo("#' . $padre . '-' . $p_columna . '-' . $p_fila . '");';
    }
    $i++;
}
$i = 0;
foreach ($mesas as $loop) {
    $mesa = $loop->no_mesa;
    $sillas = $loop->no_sillas;
    $tipo = $loop->tipo;
    $contenedor = $loop->contenedor;
    $columna = $loop->columna;
    $fila = $loop->fila;
    ?>
        var objeto_<?php echo $i; ?> = {};
        objeto_<?php echo $i; ?>["mesa"] = "<?php echo $mesa; ?>";
        objeto_<?php echo $i; ?>["sillas"] = "<?php echo $sillas; ?>";
        objeto_<?php echo $i; ?>["tipo"] = "<?php echo $tipo; ?>";
        objeto_<?php echo $i; ?>["contenedor"] = "<?php echo $contenedor; ?>";
        objeto_<?php echo $i; ?>["columna"] = "<?php echo $columna; ?>";
        objeto_<?php echo $i; ?>["fila"] = "<?php echo $fila; ?>";
        arrayMesas.push(objeto_<?php echo $i; ?>);
    <?php
    $i++;
}
$i = 0;
foreach ($invitados as $loop) {
    $no_mesa = $loop->mesa;
    $no_silla = $loop->silla;
    $codigo_barras = $loop->codigoBarras;
    $nombres_apellidos = $loop->nombresApellidos;
    $anios = $loop->anios;
    $empresa = $loop->empresa;
    $departamento = $loop->departamento;
    $puesto = $loop->puesto;
    $no_personas = $loop->numPersonas;
    ?>
        var objeto_<?php echo $i; ?> = {};
        objeto_<?php echo $i; ?>["mesa"] = "<?php echo preg_replace("/\r|\n/", "", $no_mesa); ?>";
        objeto_<?php echo $i; ?>["silla"] = "<?php echo preg_replace("/\r|\n/", "", $no_silla); ?>";
        objeto_<?php echo $i; ?>["codigoBarras"] = "<?php echo preg_replace("/\r|\n/", "", $codigo_barras); ?>";
        objeto_<?php echo $i; ?>["nombresApellidos"] = "<?php echo preg_replace("/\r|\n/", "", $nombres_apellidos); ?>";
        objeto_<?php echo $i; ?>["anios"] = "<?php echo preg_replace("/\r|\n/", "", $anios); ?>";
        objeto_<?php echo $i; ?>["empresa"] = "<?php echo preg_replace("/\r|\n/", "", $empresa); ?>";
        objeto_<?php echo $i; ?>["departamento"] = "<?php echo preg_replace("/\r|\n/", "", $departamento); ?>";
        objeto_<?php echo $i; ?>["puesto"] = "<?php echo preg_replace("/\r|\n/", "", $puesto); ?>";
        objeto_<?php echo $i; ?>["numPersonas"] = "<?php echo preg_replace("/\r|\n/", "", $no_personas); ?>";
        arrayInvitados.push(objeto_<?php echo $i; ?>);
    <?php
    $i++;
}

$i = 0;
foreach ($invNA as $loop) {
    $no_mesa = "9999";
    $no_silla = "1";
    $codigo_barras = $loop->codigoBarras;
    $nombres_apellidos = $loop->nombresApellidos;
    $anios = $loop->anios;
    $empresa = $loop->empresa;
    $departamento = $loop->departamento;
    $puesto = $loop->puesto;
    $no_personas = $loop->numPersonas;
    ?>
        var objeto_<?php echo $i; ?> = {};
        objeto_<?php echo $i; ?>["mesa"] = "<?php echo preg_replace("/\r|\n/", "", $no_mesa); ?>";
        objeto_<?php echo $i; ?>["silla"] = "<?php echo preg_replace("/\r|\n/", "", $no_silla); ?>";
        objeto_<?php echo $i; ?>["codigoBarras"] = "<?php echo preg_replace("/\r|\n/", "", $codigo_barras); ?>";
        objeto_<?php echo $i; ?>["nombresApellidos"] = "<?php echo preg_replace("/\r|\n/", "", $nombres_apellidos); ?>";
        objeto_<?php echo $i; ?>["anios"] = "<?php echo preg_replace("/\r|\n/", "", $anios); ?>";
        objeto_<?php echo $i; ?>["empresa"] = "<?php echo preg_replace("/\r|\n/", "", $empresa); ?>";
        objeto_<?php echo $i; ?>["departamento"] = "<?php echo preg_replace("/\r|\n/", "", $departamento); ?>";
        objeto_<?php echo $i; ?>["puesto"] = "<?php echo preg_replace("/\r|\n/", "", $puesto); ?>";
        objeto_<?php echo $i; ?>["numPersonas"] = "<?php echo preg_replace("/\r|\n/", "", $no_personas); ?>";
        arrayInvitados.push(objeto_<?php echo $i; ?>);
    <?php
    $i++;
}
?>

    $(document).ready(function ($) {
        $('#avisos_modal').modal('hide');
<?php
echo $move;
?>
        $('.invitados').webuiPopover({trigger: 'click', animation: 'pop', type: 'html', closeable: true, width: 250, placement: 'bottom'});
    });

</script>

<?php ?>
<div id="wrapper_nsidebar">

    <!-- Modal-->
    <div class="modal fade" id="descripcion_mesas_modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="avisosModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="descripcion_mesas_titulo"></h4>
                </div>
                <div class="modal-body" id="descripcion_mesas_contenido">
                    <table id="tabla_sillas_mesa" data-url="" data-toggle="table" data-sort-name="silla" data-sort-order="asc">
                        <thead>
                            <tr>
                                <th data-halign="center" data-align="center" data-field="anios" >Años</th>
                                <th data-field="codigoBarras" >Codigo Barras</th>
                                <th data-field="nombresApellidos" >Nombres y Apellidos</th>
                                <th data-field="departamento" >Departamento</th>
                                <th data-field="empresa" >Empresa</th>
                                <th data-field="puesto" >Puesto</th>
                                <th data-halign="center" data-align="center" data-field="silla" data-sortable="true">Silla</th>
                                <th data-halign="center" data-align="center" data-field="numPersonas" >Personas</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>


<br/><br/><br/>

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    
                    <div id="mapa_localidades" class="row">

                        <?php
                        foreach ($ubicaciones as $loop) {

                            $titulo = $loop->descripcion;
                            $padre = $loop->padre_descripcion;
                            $columnas = $loop->columnas;
                            $filas = $loop->filas;
                            $tiene_mesas = $loop->mesas;


                            if ($tiene_mesas > 0) {
                                $tabla = '<div class="tabla_localidad con_mesa" id="' . $titulo . '-' . $columnas . '-' . $filas . '">';
                            } else {
                                $tabla = '<div class="tabla_localidad">';
                            }
                            $tabla.= '<table class="' . $titulo . '">' .
                                    '<tbody>';

                            for ($i = 0; $i < $filas; $i++) {
                                $tabla.='<tr>';
                                for ($j = 0; $j < $columnas; $j++) {
                                    $tabla.='<td class="secciones_mesas asigna_mesas_' . $tiene_mesas . '" id="' . $titulo . '-' . ($j + 1) . '-' . ($i + 1) . '">';

                                    $url = URL . 'mesas/json/' . ($j + 1) . '/' . ($i + 1) . '/' . $titulo;
                                    $json = file_get_contents($url);
                                    $obj = json_decode($json);

                                    if ($obj->estado != 0) {
                                        $tabla.= dibujaMesa($obj->no_mesa, $obj->no_sillas, $obj->tipo);
                                    }
                                    $tabla.='</td>';
                                }
                                $tabla.='</tr>';
                            }

                            $tabla.='</tbody>' .
                                    '</table>' .
                                    '</div>';

                            echo $tabla;
                        }
                        ?>
                    </div>
                </div>

            </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div>
    <!-- /#wrapper -->