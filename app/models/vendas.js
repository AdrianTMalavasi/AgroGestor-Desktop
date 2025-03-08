class Vendas {
    static #idCounter = 1;
  
    #idVend;
    #nomeEmpresa;
    #qtdSacas;
    #valorSaca;
    #dataVendas;
    #mtdPagamento;
    #idSafra;
  
    constructor(nomeEmpresa, qtdSacas, valorSaca, dataVendas, mtdPagamento, idSafra) {
      this.#idVend = Vendas.#idCounter++;
      this.nomeEmpresa = nomeEmpresa;
      this.qtdSacas = qtdSacas;
      this.valorSaca = valorSaca;
      this.dataVendas = dataVendas;
      this.mtdPagamento = mtdPagamento;
      this.idSafra = idSafra;
    }
  
    get idVend() {
      return this.#idVend;
    }
  
    get nomeEmpresa() {
      return this.#nomeEmpresa;
    }
  
    set nomeEmpresa(value) {
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error("Nome da empresa deve ser uma string não vazia.");
      }
      this.#nomeEmpresa = value;
    }
  
    get qtdSacas() {
      return this.#qtdSacas;
    }
  
    set qtdSacas(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new Error("Quantidade de sacas deve ser um número inteiro não negativo.");
      }
      this.#qtdSacas = value;
    }
  
    get valorSaca() {
      return this.#valorSaca;
    }
  
    set valorSaca(value) {
      if (typeof value !== 'number' || value < 0) {
        throw new Error("Valor da saca deve ser um número não negativo.");
      }
      this.#valorSaca = value;
    }
  
    get dataVendas() {
      return this.#dataVendas;
    }
  
    set dataVendas(value) {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
        throw new Error("Data da venda deve ser uma instância válida de Date.");
      }
      this.#dataVendas = value;
    }
  
    get mtdPagamento() {
      return this.#mtdPagamento;
    }
  
    set mtdPagamento(value) {
      this.#mtdPagamento = value;
    }
  
    get idSafra() {
      return this.#idSafra;
    }
  
    set idSafra(value) {
      this.#idSafra = value;
    }
  
    toString() {
      return `ID: ${this.#idVend}
              Empresa: ${this.#nomeEmpresa}
              Quantidade de Sacas: ${this.#qtdSacas}
              Valor por Saca: ${this.#valorSaca}
              Data da Venda: ${this.#dataVendas.toLocaleDateString()}
              Método de Pagamento: ${this.#mtdPagamento}
              ID Safra: ${this.#idSafra}`;
    }
  }
  