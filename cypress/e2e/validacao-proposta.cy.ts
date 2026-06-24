import { toCyString } from "../helpers/kebab.helper";

describe("Submeter uma proposta - Validações", () => {
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  context("Testes de validação de formulário (caminho infeliz - seção 10.3)", () => {
    
    before(() => {
      cy.visit("/");
      cy.fixture("criar-conta").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);
      });
      // CORREÇÃO: Utilizando a nova fixture exclusiva para as validações
      cy.fixture("validacao-proposta").then((dados) => {
        cy.get('[data-cy="editais-ver-mais"]').click();
        cy.contains("Edital 002 - Lançamento de Notas")
          .parents("div")
          .first()
          .find("button")
          .contains("Visualizar edital")
          .click();
        cy.get('[data-cy="criar-proposta"]').click();
        cy.get('[data-cy="titulo"]').clear().type(dados.titulo);
        cy.get('[data-cy="menu-salvar"]').click();

        cy.visit("/");

        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
      });
    });

    beforeEach(() => {
      cy.visit("/");
      cy.fixture("criar-conta").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);
      });
      // CORREÇÃO: Utilizando a nova fixture
      cy.fixture("validacao-proposta").then((dados) => {
        cy.get('[data-cy="projetos-ver-mais"]').click();
        cy.get(".css-kexj09.elzkvqq38").click();
        
        const removerFiltros = () => {
          cy.get("body").then(($body) => {
            const totalBotoes = $body.find(".css-1ibkshd.elzkvqq25").length;
            if (totalBotoes > 0) {
              cy.get(".css-1ibkshd.elzkvqq25").first().click();
              if (totalBotoes === 1) {
                cy.get(".css-1ibkshd.elzkvqq25").should("not.exist");
              } else {
                cy.get(".css-1ibkshd.elzkvqq25").should("have.length", totalBotoes - 1);
              }
              removerFiltros();
            }
          });
        };
        removerFiltros();
        
        cy.get('[data-cy="add-filter-select"]').click();
        cy.get('[data-cy="titulo"]').click();
        cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
        
        cy.intercept('GET', '**/api/proposta/minhas-propostas**').as('buscarPropostas');
        cy.get(".css-ncst9s.elzkvqq19").click();
        
        cy.wait('@buscarPropostas');
        cy.wait(500); 

        cy.get("#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68").click({ force: true });
      });
    });

    after(() => {
      cy.visit("/");
      cy.wait(2000);
      
      // CORREÇÃO: Utilizando a nova fixture
      cy.fixture("validacao-proposta").then((dados) => {
        cy.get('[data-cy="projetos-ver-mais"]').click();
        cy.get(".css-kexj09.elzkvqq38").click();
        
        const removerFiltros = () => {
          cy.get("body").then(($body) => {
            const totalBotoes = $body.find(".css-1ibkshd.elzkvqq25").length;
            if (totalBotoes > 0) {
              cy.get(".css-1ibkshd.elzkvqq25").first().click();
              if (totalBotoes === 1) {
                cy.get(".css-1ibkshd.elzkvqq25").should("not.exist");
              } else {
                cy.get(".css-1ibkshd.elzkvqq25").should("have.length", totalBotoes - 1);
              }
              removerFiltros();
            }
          });
        };
        removerFiltros();
        
        cy.get('[data-cy="add-filter-select"]').click();
        cy.get('[data-cy="titulo"]').click();
        cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
        
        cy.intercept('GET', '**/api/proposta/minhas-propostas**').as('buscarParaApagar');
        cy.get(".css-ncst9s.elzkvqq19").click();
        
        cy.wait('@buscarParaApagar');
        cy.wait(500);

        cy.get("#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(3) > button.css-ylpd68").click({ force: true });
        cy.get('[data-cy="sim-continuar-button"]').click();
        cy.get('[data-cy="confirmar-button"]').click();
        cy.visit("/");
      });
    });

    it('Exibe aviso de campo obrigatório vazio ao verificar pendências em "Caracterização".', () => {
      cy.contains('Caracterização').click();
      
      cy.get('[data-cy="duracao"]').clear();
      
      cy.get('[data-cy="menu-salvar"]').click();

      cy.get('[data-cy="menu-verificar-pendencias"]').click({ force: true });
      
      cy.contains('Pendências').should('be.visible'); 
    });

    it('Exibe erro ao inserir menos de 15 caracteres no campo "Ocupação da equipe".', () => {
      cy.get('[data-cy="informacoes-complementares"]').click();
      
      // CORREÇÃO: Consumindo a variável do JSON em vez de ter o texto engessado no código
      cy.fixture("validacao-proposta").then((dados) => {
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-31"]')
          .clear()
          .type(dados.ocupacaoInvalida);
      });

      cy.get('[data-cy="menu-salvar"]').click();

      cy.contains('15').should('be.visible'); 
    });

    it('Bloqueia a submissão e exibe o ecrã de "Pendências" devido à falta de dados.', () => {
      cy.contains('Finalização').click();

      cy.get('[data-cy="menu-verificar-pendencias"]').click({ force: true });
      
      cy.contains('Pendências').should('be.visible');
      
      cy.contains('button', 'Submeter').should('not.exist');
    });

  });
});