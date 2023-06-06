export interface responseJueces {
    ok: boolean,
    msg?:string,
    juez?: {
        nombre: string,
        primerApellido: string,
        segundoApellido: string,
        email: string,
        role: 'ADMIN' | 'JUEZ' | 'SEC',
        foto: string,
        resetPassword: boolean,
        id: string
    }
}