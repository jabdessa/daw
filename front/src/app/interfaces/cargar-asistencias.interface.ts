import { Asistencia } from '../models/asistencia.model';

export interface CargarAsistencia {
    ok: boolean;
    asistencias: Asistencia[];
}