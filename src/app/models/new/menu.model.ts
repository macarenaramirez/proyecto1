export interface Menu {
  id: number;
  nombre: string;
  idPadre: number;
  permiso: string;
  routerLink: string;
  nivel: number;
  orden: number;
  status: boolean;
}
