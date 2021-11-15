export class TransferenciaModel {
    nombre!:       string;
    rut!:          string;
    correo!: string;
    bancoDestino!: BancoDestino;
    tipoCuenta!:   BancoDestino;
    numCuenta!:    number;
    monto!:        number;
}

export class BancoDestino {
    name!: string;
    id!:   string;
}