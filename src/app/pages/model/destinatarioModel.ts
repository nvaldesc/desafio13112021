// match the expected interface, even if the JSON is valid.

export class DestinatarioModel {
    _id!:string;
    nombre!:       string;
    rut!:          string;
    correo!:       string;
    telefono!:     number;
    bancoDestino!: BancoDestino;
    tipoCuenta!:   BancoDestino;
    numCuenta!:    number;
}

export class BancoDestino {
    name!: string;
    id!:   string;
}