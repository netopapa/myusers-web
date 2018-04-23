import { Aparelho } from '../aparelho/aparelho.model';
import { Perfil } from '../perfil/perfil.model';

export class Usuario {
    id_usuario: number;
    nome_usuario = '';
    login = '';
    email = '';
    senha = '';
    data_criacao: Date;
    tempo_expiracao_senha: number;
    cod_autorizacao = '';
    status_usuario = '';
    cod_pessoa: number;
    aparelhos: Aparelho[];
    aparelhosTxt = '';
    perfis: Perfil[];
    perfisTxt = '';

    constructor() {
        this.aparelhos = [];
        this.perfis = [];
        this.data_criacao = new Date();
    }
}
