export interface FipeModelos {
    modelos: Modelo[];
    anos: Ano[];
  }
  
  export interface Ano {
    nome: string;
    codigo: string;
  }
  
  export interface Modelo {
    nome: string;
    codigo: number;
  }