import { Solicitud } from './solicitud'
export class Dermatologo {
  apellido: string;
  codigo: string;
  correo: string;
  estado: string;
  id: string;
  imagenDni: string;
  imagenProfile: string;
  nacimiento?: string;
  nombre: string;
  tipo: string;
  solicitudes?: Solicitud;
  respuesta?: boolean;
  data?: {
    cpm:string,
    nombre: string,
    apellido:string,  
  };
}
