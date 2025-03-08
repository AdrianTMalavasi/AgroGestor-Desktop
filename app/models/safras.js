 class Safras {
    static #idCounter = 1;
  
    #idSafr;
    #hectares;
    #ano;
    #idUsua;
    #idEsto;
  
    constructor(hectares, ano, idUsua, idEsto) {
      this.#idSafr = Safras.#idCounter++;
      this.hectares = hectares;
      this.ano = ano;
      this.idUsua = idUsua;
      this.idEsto = idEsto;
    }
  
    get idSafr() {
      return this.#idSafr;
    }
  
    get hectares() {
      return this.#hectares;
    }
  
    set hectares(value) {
      if (typeof value !== 'number' || value < 0) {
        throw new RangeError("O parâmetro 'hectares' deve ser um número não negativo.");
      }
      this.#hectares = value;
    }
  
    get ano() {
      return this.#ano;
    }
  
    set ano(value) {
      if (!Number.isInteger(value) || value < 1900 || value > new Date().getFullYear()) {
        throw new RangeError("O parâmetro 'ano' deve ser um número inteiro válido (de 1900 até o ano atual).");
      }
      this.#ano = value;
    }
  
    get idUsua() {
      return this.#idUsua;
    }
  
    set idUsua(value) {
      if (!Number.isInteger(value) || value <= 0) {
        throw new RangeError("O parâmetro 'idUsua' deve ser um número inteiro positivo.");
      }
      this.#idUsua = value;
    }
  
    get idEsto() {
      return this.#idEsto;
    }
  
    set idEsto(value) {
      if (!Number.isInteger(value) || value <= 0) {
        throw new RangeError("O parâmetro 'idEsto' deve ser um número inteiro positivo.");
      }
      this.#idEsto = value;
    }
  
    toString() {
      return `ID Safra: ${this.#idSafr}
              Hectares: ${this.#hectares}
              Ano: ${this.#ano}
              ID Usuário: ${this.#idUsua}
              ID Estoque: ${this.#idEsto}`;
    }
  }
  