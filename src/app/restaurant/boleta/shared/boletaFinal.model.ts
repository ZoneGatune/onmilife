import { VentaSeleccionada } from './../../lista-menu/shared/venta.model';

export class BoletaFinal {
    $key: string;
    venta: VentaSeleccionada;
    total: number;
    totalPlatos: number;
    estado: string;
    mesa: string;
    codigoMesa: string;
    fecha: string;
    fechaHora: string;
    codigoElectronico: string;
    rucCliente: string;
    nombreCliente: string;
    tipoDocumento: string;


}
