class Producao {
  static #idCounter = 1;

  #idProd;
  #dataProducao;
  #qtdSacas;
  #idSafra;

  constructor(dataProducao, qtdSacas, idSafra) {
    this.#idProd = Producao.#idCounter++;
    this.dataProducao = dataProducao;
    this.qtdSacas = qtdSacas;
    this.idSafra = idSafra;
  }

  get idProd() {
    return this.#idProd;
  }

  get dataProducao() {
    return this.#dataProducao;
  }

  set dataProducao(value) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new TypeError("O parâmetro 'dataProducao' deve ser uma instância válida de Date.");
    }
    this.#dataProducao = value;
  }

  get qtdSacas() {
    return this.#qtdSacas;
  }

  set qtdSacas(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new RangeError("O parâmetro 'qtdSacas' deve ser um número inteiro não negativo.");
    }
    this.#qtdSacas = value;
  }

  get idSafra() {
    return this.#idSafra;
  }

  set idSafra(value) {
    this.#idSafra = value;
  }

  toString() {
    return `ID Produção: ${this.#idProd}
            Data de Produção: ${this.#dataProducao.toLocaleDateString()}
            Quantidade de Sacas: ${this.#qtdSacas}
            ID Safra: ${this.#idSafra}`;
  }
}
