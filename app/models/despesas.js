 class Despesas {
    static #idCounter = 1;
  
    #idDesp;
    #nomeEmpresa;
    #descricao;
    #diasPagar;
    #dataCompra;
    #mtdPagamento;
    #valorTotal;
    #idSafr;
  
    constructor(nomeEmpresa, descricao, diasPagar, dataCompra, mtdPagamento, valorTotal, idSafr) {
      this.#idDesp = Despesas.#idCounter++;
      this.nomeEmpresa = nomeEmpresa;
      this.descricao = descricao;
      this.diasPagar = diasPagar;
      this.dataCompra = dataCompra;
      this.mtdPagamento = mtdPagamento;
      this.valorTotal = valorTotal;
      this.idSafr = idSafr;
    }
  
    get idDesp() {
      return this.#idDesp;
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
  
    get descricao() {
      return this.#descricao;
    }
  
    set descricao(value) {
      this.#descricao = value;
    }
  
    get diasPagar() {
      return this.#diasPagar;
    }
  
    set diasPagar(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new Error("Dias para pagar deve ser um número inteiro não negativo.");
      }
      this.#diasPagar = value;
    }
  
    get dataCompra() {
      return this.#dataCompra;
    }
  
    set dataCompra(value) {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
        throw new Error("Data de compra deve ser uma instância válida de Date.");
      }
      this.#dataCompra = value;
    }
  
    get mtdPagamento() {
      return this.#mtdPagamento;
    }
  
    set mtdPagamento(value) {
      this.#mtdPagamento = value;
    }
  
    get valorTotal() {
      return this.#valorTotal;
    }
  
    set valorTotal(value) {
      if (typeof value !== 'number' || value < 0) {
        throw new Error("Valor total deve ser um número não negativo.");
      }
      this.#valorTotal = value;
    }
  
    get idSafr() {
      return this.#idSafr;
    }
  
    set idSafr(value) {
      this.#idSafr = value;
    }
  
    toString() {
      return `ID: ${this.#idDesp}
              Empresa: ${this.#nomeEmpresa}
              Descrição: ${this.#descricao}
              Dias para pagar: ${this.#diasPagar}
              Data da compra: ${this.#dataCompra.toLocaleDateString()}
              Método de pagamento: ${this.#mtdPagamento}
              Valor total: ${this.#valorTotal}
              ID Safra: ${this.#idSafr}`;
    }
  }
  