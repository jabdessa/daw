import { Competicion } from '../models/competicion.model';

export interface CargarCompeticion {
    total: number;
    competiciones: Competicion[];
}