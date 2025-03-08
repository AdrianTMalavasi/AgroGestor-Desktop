//  class Usuarios {
//     static #idCounter = 1;
  
//     #idSafra;
//     #login;
//     #senha;
  
//     constructor(login, senha) {
//       this.#idSafra = Safras.#idCounter++;
//       this.login = login;
//       this.senha = senha;
//     }
  
//     get idSafra() {
//       return this.#idSafra;
//     }
  
//     get login() {
//       return this.#login;
//     }
  
//     set login(value) {
//       if (typeof value !== 'string' || value.trim() === '') {
//         throw new Error("Login deve ser uma string não vazia.");
//       }
//       this.#login = value;
//     }
  
//     get senha() {
//       return this.#senha;
//     }
  
//     set senha(value) {
//       if (typeof value !== 'string' || value.trim() === '') {
//         throw new Error("Senha deve ser uma string não vazia.");
//       }
//       this.#senha = value;
//     }
  
//     toString() {
//       return `ID Safra: ${this.#idSafra}, Login: ${this.#login}`;
//     }
//   }
  