import { VentaSeleccionada } from './../../lista-menu/shared/venta.model';

export class Boleta {
    $key: string;
    venta: VentaSeleccionada;
    total: number;
    totalPlatos: number;
    estado: string;
    mesa: string;
    codigoMesa: string;
    codigoElectronico: string;
    rucCliente: string;
    nombreCliente: string;
    tipoDocumento: string;

}
