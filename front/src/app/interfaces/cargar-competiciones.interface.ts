import { Competicion } from '../models/competicion.model';

export interface CargarCompeticion {
    ok: boolean;
    competiciones: Competicion[];
}