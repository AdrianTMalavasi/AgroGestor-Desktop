class Estoque {
    static #idCounter = 1;
  
    #idEsto;
    #quantidadeMax;
  
    constructor(quantidadeMax) {
      this.#idEsto = Estoque.#idCounter++;
      this.quantidadeMax = quantidadeMax;
    }
  
    get idEsto() {
      return this.#idEsto;
    }
  
    get quantidadeMax() {
      return this.#quantidadeMax;
    }
  
    set quantidadeMax(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new RangeError("O parâmetro 'quantidadeMax' deve ser um número inteiro não negativo.");
      }
      this.#quantidadeMax = value;
    }
  
    toString() {
      return `ID Estoque: ${this.#idEsto}, Quantidade Máxima: ${this.#quantidadeMax}`;
    }
  }
  