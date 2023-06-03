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

    // get imagenUrl() {

    //     if (!this.img) {
    //         return `${base_url}/upload/jueces/no-image`;
    //     } else if (this.img.includes('https')) {
    //         return this.img;
    //     } else if (this.img) {
    //         return `${base_url}/upload/jueces/${this.img}`;
    //     } else {
    //         return `${base_url}/upload/jueces/no-image`;
    //     }
    // }
}

