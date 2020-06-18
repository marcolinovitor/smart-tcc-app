export interface ClienteResponse {
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
    editable?: boolean;
  }