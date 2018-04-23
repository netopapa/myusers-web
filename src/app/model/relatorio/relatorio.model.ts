import { Aparelho } from '../aparelho/aparelho.model';
import { Usuario } from '../usuario/usuario.model';

export class AparelhoList {
    tipo = 'aparelhos';
    data: Aparelho[];
    nome_usuario = '';

    constructor() {
        this.data = [];
    }
}

export class UsuarioList {
    tipo = 'usuarios';
    data: Usuario[];

    constructor() {
        this.data = [];
    }
}
