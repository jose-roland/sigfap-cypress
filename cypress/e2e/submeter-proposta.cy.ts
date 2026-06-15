import { toCyString } from "../helpers/kebab.helper";

describe("Submeter uma proposta", () => {
    context("Sumbeter uma proposta com todos os dados válidos (caminho feliz)", () => {
        before(() => {
            //O usuário faz login no sistema.
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
        });
        beforeEach(() => {
            //O usuário faz login no sistema.
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
        });
        it("Vai para seção \"Caracterização\" e preenche e salva a cada sub-seção.", () => {
            // Seu código aqui
        });
        it("Vai para seção \"Coordenação\" e preenche e salva a cada sub-seção.", () => {
            // Seu código aqui
        });
        it("Vai para seção \"Apresentação\" e preenche e salva a cada sub-seção.", () => {
            // Seu código aqui
        });
        it("Vai para sub-seção \"Orçamento\" e preenche e salva a cada rúbrica.", () => {
            // Seu código aqui
        });
        it("Vai para seção \"Anexos\" e preenche e salva a cada sub-seção.", () => {
            // Seu código aqui
        });
        it("Vai para seção \"Finalização\" e preenche e salva a cada sub-seção. Submete a proposta", () => {
            // Seu código aqui
        });
    });
});
