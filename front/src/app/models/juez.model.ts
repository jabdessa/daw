import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Juez {

    constructor(
        public nombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public email: string,
        public role?: 'ADMIN' | 'JUEZ' | 'SEC',
        public foto?: string,
        public id?: string,
        public password?: string,
        public resetPassword?: boolean,
    ) { }

    get fotoUrl() {

        if (!this.foto) {
            return `${base_url}/upload/jueces/no-image`;
        } else if (this.foto.includes('https')) {
            return this.foto;
        } else if (this.foto) {
            return `${base_url}/upload/jueces/${this.foto}`;
        } else {
            return `${base_url}/upload/jueces/no-image`;
        }
    }
}

