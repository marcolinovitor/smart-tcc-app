export interface IOrcamentoList {
    status: number;
    aprovacao: boolean;
    referencia: string;
    problemaRelatado: string;
    problemaDescrito: string;
    carroId: number;
    carro: Carro;
    servicos: Servico[];
    id: number;
    updating?: boolean;
  }
  
  export interface Servico {
    servicoId: number;
    servico: ServicoDescription;
    ordemServicoId: number;
    descricaoServico: string;
    valorServico: number;
    id: number;
  }
  
  export interface ServicoDescription {
    nome: string;
    valor: number;
    id: number;
  }
  
  export interface Carro {
    placa: string;
    modelo: string;
    marca: string;
    clienteId: number;
    cliente: Cliente;
    id: number;
  }
  
  export interface Cliente {
    nome: string;
    cpfCnpj: string;
    telefone: string;
    email: string;
    senha: string;
    perfilSistema: string;
    oficinaId: number;
    oficina?: any;
    carros: any[];
    id: number;
  }