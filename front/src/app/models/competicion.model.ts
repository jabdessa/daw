
export class Competicion {
    constructor(
        public nombre: string,
        public lugar: string,
        public fecha?: Date,
        public jornada?: string,
        public organizador?: string,
        public horario?: string,
        public id?: string,
        // jueces disponibles.
        public disponibilidad?: number
    ) { }

}

