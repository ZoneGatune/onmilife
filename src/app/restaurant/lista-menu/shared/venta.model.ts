import { Carta } from '../../carta/shared/carta.model';
import { Carta1 } from '../../carta/shared/carta1.model';

export class VentaSeleccionada {
  $key: string;
  id: string;
  estado: string;
  fecha: string;
  mesa: string;
  codigoMesa: string;
  codigoMozo: string;
  mozo: string;
  cartaList = new Array<Carta1>();
}
