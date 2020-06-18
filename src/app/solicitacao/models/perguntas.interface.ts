import { PreAberturaResponse } from './abertura-os.interface';
import { MeuVeiculo } from 'src/app/meus-carros/model/meu-veiculo';
// import { MeuVeiculo } from '../../meus-carros/model/meu-veiculo';

export class Alternativa {
	alternativa: string;
	perguntaOSId: number;
	alternativaFinal: boolean;
	preAberturaOSId?: any;
	proximaPerguntaOSId?: any;
	proximaPerguntaOS?: any;
	preAberturaOS?: any;
    id: number;
    idCarro?: number;
}

export class PerguntasResponse {
    isClient?: boolean;
    pergunta: string;
    descricao?: string;
	perguntaInicial: boolean;
	alternativas = new Array<Alternativa>();
    id: number;
    encerramento?: PreAberturaResponse;
    sugerirCadastro?: boolean;
    
    setClienteEscolha(alter: Alternativa) {
        const item = new PerguntasResponse();
        item.isClient = true;
        item.pergunta = alter.alternativa;
        return item;
    }

    setEncerramento(preOrdem: PreAberturaResponse) {
        const item = new PerguntasResponse();
        item.isClient = false;
        item.pergunta = preOrdem.assunto;
        item.descricao = preOrdem.descricao;
        item.alternativas = null;
        return item;
    }

    setVeiculos(veiculos: MeuVeiculo[], nomeCliente: string) {       
        const item = new PerguntasResponse();
        item.isClient = false;
        item.pergunta = `Olá, ${nomeCliente}, de qual veículo deseja falar?`;
        veiculos.forEach(veiculo => {
            item.alternativas.push({
                alternativa: `${veiculo.marca} ${veiculo.modelo}`,
                id: veiculo.id,
                perguntaOSId: 0,
                alternativaFinal: false,
                idCarro: veiculo.id,
            });
        })
        return item;
    }

    setSegurirCadastro() {       
        const item = new PerguntasResponse();
        item.isClient = false;
        item.pergunta = 'Hmm, notei que você não possui um veículo cadastrado. Deseja cadastrar?';
        item.sugerirCadastro = true;
        item.descricao = '';
        item.alternativas = null;
        return item;
    }
}