import { toCyString } from "../helpers/kebab.helper";

describe("Submeter uma proposta", () => {
    context("Sumbeter uma proposta com todos os dados válidos (caminho feliz)", () => {
        before(() => {
            //O usuário faz login no sistema.
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                //O usuário vai para área com todos os editais abertos (Clicar no botão Ver Mais na tabela Editais Abertos na home do sistema).
                cy.get('[data-cy="editais-ver-mais"]').click();
                // Procura o edital [Edital 2026-0001 Sig Cypress] e clica no botão Visualizar Edital.
                cy.contains('Edital 002 - Lançamento de Notas')
                    .parents('div').first()         // 1. Sobe até o primeiro DIV pai que encontrar
                    .find('button')                // 2. Procura um botão lá dentro
                    .contains('Visualizar edital') // 3. Garante que é o botão com o texto certo
                    .click();
                cy.get('[data-cy="criar-proposta"]').click();
                cy.get('[data-cy="titulo"]').clear().type(dados.titulo);
                cy.get('[data-cy="menu-salvar"]').click();
                cy.clearCookies()
                cy.clearLocalStorage()
                cy.clearAllSessionStorage()
            });
        });
        beforeEach(() => {
            //O usuário faz login no sistema.
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="projetos-ver-mais"]').click();
                cy.get('.css-kexj09.elzkvqq38').click();//Sugiro um data-cy para isso
                const removerFiltros = () => {
                    cy.get('body').then(($body) => {
                        const totalBotoes = $body.find('.css-1ibkshd.elzkvqq25').length;
                        if (totalBotoes > 0) {
                            cy.get('.css-1ibkshd.elzkvqq25').first().click();
                            if (totalBotoes === 1) {
                                // Se era o último botão, espera ele sumir completamente
                                cy.get('.css-1ibkshd.elzkvqq25').should('not.exist');
                            } else {
                                // Se tem vários botões, espera a quantidade reduzir em exatamente 1
                                cy.get('.css-1ibkshd.elzkvqq25').should('have.length', totalBotoes - 1);
                            }
                            removerFiltros();
                        }
                    });
                };
                removerFiltros();
                cy.get('[data-cy="add-filter-select"]').click();
                cy.get('[data-cy="titulo"]').click();
                cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
                cy.get('.css-ncst9s.elzkvqq19').click();
                cy.get('#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68 > svg').click();//Sugiro um data-cy para isso  
            });
        });
                //Após todos os testes de submissão da proposta, o after a remove para evitar acúmulo desnecessário
        //Caso não deseje este comportamento, comente o after
        after(() => {
            //O usuário já está logado no sistema
            cy.visit("/");
            //Busca e remove a proposta que foi criada nos testes
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="projetos-ver-mais"]').click();
                cy.get('.css-kexj09.elzkvqq38').click();//Sugiro um data-cy para isso
                const removerFiltros = () => {
                    cy.get('body').then(($body) => {
                        const totalBotoes = $body.find('.css-1ibkshd.elzkvqq25').length;
                        if (totalBotoes > 0) {
                            cy.get('.css-1ibkshd.elzkvqq25').first().click();
                            if (totalBotoes === 1) {
                                // Se era o último botão, espera ele sumir completamente
                                cy.get('.css-1ibkshd.elzkvqq25').should('not.exist');
                            } else {
                                // Se tem vários botões, espera a quantidade reduzir em exatamente 1
                                cy.get('.css-1ibkshd.elzkvqq25').should('have.length', totalBotoes - 1);
                            }
                            removerFiltros();
                        }
                    });
                };
                removerFiltros();
                cy.get('[data-cy="add-filter-select"]').click();
                cy.get('[data-cy="titulo"]').click();
                cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
                cy.get('.css-ncst9s.elzkvqq19').click();
                cy.get('#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(3) > button.css-ylpd68 > svg.css-16snoe8').click();
                cy.get('[data-cy="sim-continuar-button"]').click();
                cy.get('[data-cy="confirmar-button"]').click();
                cy.visit("/");
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
