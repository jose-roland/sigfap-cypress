import { toCyString } from "../helpers/kebab.helper";

describe("Submeter uma proposta", () => {
    context("Sumbeter uma proposta com todos os dados válidos (caminho feliz)", () => {
        before(() => {
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="editais-ver-mais"]').click();
                cy.contains('Edital 002 - Lançamento de Notas')
                    .parents('div').first()
                    .find('button')
                    .contains('Visualizar edital')
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
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="projetos-ver-mais"]').click();
                cy.get('.css-kexj09.elzkvqq38').click();
                const removerFiltros = () => {
                    cy.get('body').then(($body) => {
                        const totalBotoes = $body.find('.css-1ibkshd.elzkvqq25').length;
                        if (totalBotoes > 0) {
                            cy.get('.css-1ibkshd.elzkvqq25').first().click();
                            if (totalBotoes === 1) {
                                cy.get('.css-1ibkshd.elzkvqq25').should('not.exist');
                            } else {
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
                cy.get('#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68 > svg').click();
            });
        });
        
        after(() => {
            cy.visit("/");
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="projetos-ver-mais"]').click();
                cy.get('.css-kexj09.elzkvqq38').click();
                const removerFiltros = () => {
                    cy.get('body').then(($body) => {
                        const totalBotoes = $body.find('.css-1ibkshd.elzkvqq25').length;
                        if (totalBotoes > 0) {
                            cy.get('.css-1ibkshd.elzkvqq25').first().click();
                            if (totalBotoes === 1) {
                                cy.get('.css-1ibkshd.elzkvqq25').should('not.exist');
                            } else {
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
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="duracao"]').clear().type('12');
                cy.get('[data-cy="search-instituicao-executora-id"]').type('UFMS{enter}');
                cy.get('[data-cy="search-unidade-executora-id"]').type('FACOM{enter}');
                
                cy.get('[data-cy="menu-salvar"]').click();
                cy.contains('Salvo com sucesso').should('be.visible');

                cy.reload();

                cy.get('[data-cy="duracao"]').should('have.value', '12');
                cy.get('[data-cy="search-instituicao-executora-id"]').should('have.value', 'UFMS');
            });
        });

        it("Vai para seção \"Coordenação\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Coordenação').click();

            cy.get('[data-cy="search-sexo"]').type('Masculino{enter}');
            cy.get('[data-cy="search-pais-id"]').type('Brasil{enter}');
            
            cy.get('[data-cy="menu-salvar"]').click();
            cy.contains('Salvo com sucesso').should('be.visible');

            cy.reload();

            cy.get('[data-cy="search-pais-id"]').should('have.value', 'Brasil');
        });
        
        it("Vai para seção \"Apresentação\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Apresentação').click();

            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-33"]').clear().type('Informações relevantes do teste Cypress');
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-34"]').clear().type('Experiência do coordenador em testes');
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-36"]').clear().type('Objetivo geral: Validar persistência');

            cy.get('[data-cy="menu-salvar"]').click();
            cy.contains('Salvo com sucesso').should('be.visible');

            cy.reload();

            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-33"]').should('have.value', 'Informações relevantes do teste Cypress');
        });

        it("Vai para seção \"Anexos\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Anexos').click();
            
            cy.get('#select-categories-documento-proposta-anexo').click();
            cy.get('[data-cy="documento-1"]').click();

            cy.get('input[type="file"]').selectFile('../SIGFAP-CYPRESS/cypress/fixtures/documento-com-foto.pdf', { force: true });
            
            cy.get('[data-cy="menu-salvar"]').click();
            cy.contains('Salvo com sucesso').should('be.visible');

            cy.reload();
            cy.contains('documento-com-foto.pdf').should('exist');
        });

        it("Vai para seção \"Finalização\" e preenche e salva a cada sub-seção. Submete a proposta", () => {
            cy.contains('Finalização').click();

            cy.get('[data-cy="termo-de-aceite-aceito-box"]').click();

            cy.get('[data-cy="menu-verificar-pendencias"]').click();

            cy.contains('Pendências').should('be.visible');
        });
        
    });
});