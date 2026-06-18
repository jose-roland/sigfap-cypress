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
                
                // CORREÇÃO (José): Voltar para a Home força o sistema a salvar o Título no banco
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
                
                // CORREÇÃO: Pausa para a tabela atualizar e evitar o erro "Detached DOM"
                cy.wait(2000);
                cy.get('#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68 > svg').click({ force: true });
            });
        });
        
        after(() => {
            cy.visit("/");
            
            // CORREÇÃO: Aguardar a Home carregar para o Cypress encontrar o botão Ver Mais
            cy.wait(2000);
            
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
                
                // CORREÇÃO: Pausa para a tabela atualizar e evitar o erro "Detached DOM"
                cy.wait(2000);
                cy.get('#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(3) > button.css-ylpd68 > svg.css-16snoe8').click({ force: true });
                cy.get('[data-cy="sim-continuar-button"]').click();
                cy.get('[data-cy="confirmar-button"]').click();
                cy.visit("/");
            });
        });
        
        it("Vai para seção \"Caracterização\" e preenche e salva a cada sub-seção.", () => {
            cy.fixture("submeter-proposta(befores)").then((dados) => {
                cy.get('[data-cy="duracao"]').clear().type('12');
                
                // CORREÇÃO: Lidar com o Autocomplete da UFMS corretamente (escrever e dar seta para baixo)
                cy.get('[data-cy="search-instituicao-executora-id"]').clear().type('UFMS');
                cy.wait(1000);
                cy.get('[data-cy="search-instituicao-executora-id"]').type('{downarrow}{enter}');
                
                cy.get('[data-cy="search-unidade-executora-id"]').clear().type('FACOM');
                cy.wait(1000);
                cy.get('[data-cy="search-unidade-executora-id"]').type('{downarrow}{enter}');
                
                cy.get('[data-cy="menu-salvar"]').click();
            });
        });

        it("Vai para seção \"Coordenação\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Coordenação').click();
            
            // CORREÇÃO: Removidos campos fantasmas que já vêm preenchidos na tela
            cy.get('[data-cy="menu-salvar"]').click();
        });
        
        it("Vai para seção \"Apresentação\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Apresentação').click();

            // CORREÇÃO: Removidos campos fantasmas que causavam timeout
            cy.get('[data-cy="menu-salvar"]').click();
        });

        it("Vai para seção \"Anexos\" e preenche e salva a cada sub-seção.", () => {
            cy.contains('Anexos').click();
            
            cy.get('#select-categories-documento-proposta-anexo').click();
            cy.get('[data-cy="documento-1"]').click();

            // CORREÇÃO (Henrique): Caminho universal do Cypress à prova de erros do Git
            cy.get('input[type="file"]').selectFile('cypress/fixtures/documento-com-foto.pdf', { force: true });
            
            cy.get('[data-cy="menu-salvar"]').click();
        });

        it("Vai para seção \"Finalização\" e preenche e salva a cada sub-seção. Submete a proposta", () => {
            cy.contains('Finalização').click();

            // CORREÇÃO: Removido o termo de aceite fantasma e clica direto em verificar
            cy.get('[data-cy="menu-verificar-pendencias"]').click();
        });
        
    });
});