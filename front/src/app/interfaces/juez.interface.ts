

export interface JuezRegister {
    nombre: String,
    primerApellido: String,
    segundoApellido: String,
    password: String,
    passwordMatch: 'ADMIN' | 'JUEZ' | 'SEC',
    role: String,
    foto: String
}
