import { Aparelho } from '../aparelho/aparelho.model';

export class AparelhoList {
    tipo = 'aparelhos';
    data: Aparelho[];
    nome_usuario = '';

    constructor() {
        this.data = [];
    }
}
