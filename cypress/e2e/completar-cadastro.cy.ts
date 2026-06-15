import { toCyString } from "../helpers/kebab.helper";

describe("Completar cadastro do usuário", () => {
    context("Completar todos os campos de informação do usuário", () => {
        beforeEach(() => {
            //O usuário faz login no sistema.
            cy.visit("/");
            cy.fixture("criar-conta").then((dados) => {
                cy.typeLogin(dados.email, dados.senha);
            });
            //O usário vai para a área perfil (icone no canto superior direito, opção "Perfil")
            cy.get('[data-cy="user-menu"]').click();
            cy.get('[data-cy="editar-perfil"]').click();
            
            
        });
        it("Vai para sub-seção \"Endereço\" e preenche os campos vindos da fixture e salvar.", () => {
            cy.fixture("completar-cadastro").then((endereco) => {
            
                cy.get('[data-cy="endereco"]').click();
            
                cy.get('[data-cy="endereco.cep"]').clear().type(endereco.cep);
            
                cy.get('[data-cy="endereco.numero"]').clear().type(endereco.numero);
            
                cy.get('[data-cy="endereco.complemento"]').clear().type(endereco.complemento);
            
                cy.get('[data-cy="menu-salvar"]').click();
            
            });
            cy.get('#root span.css-5bljoh').should('have.text', 'Sucesso');
        });
        it("Vai para sub-seção \"Dados Acadêmicos\" e preenche os campos vindos da fixture e salvar.", () => {
            cy.fixture("completar-cadastro").then((dados) => {                
            
                cy.get('[data-cy="dados-academicos"]').click();
            
                cy.get('[data-cy="search-instituicao-id"]').clear().type(dados.instituicao + '{enter}');
            
                cy.get('[data-cy="search-unidade-id"]').clear().type(dados.unidade + '{enter}');
            
                cy.get('[data-cy="search-nivel-academico-id"]').clear().type(dados.nivel + '{enter}');
              
                cy.get('[data-cy="lattes"]').clear().type(dados.lattes);
                
                cy.get('[data-cy="linkedin"]').clear().type(dados.linkedin);
            
                const apagarAreas = () => {
                    cy.get('body').then(($body) => {
                        const totalBotoes = $body.find('[data-cy="apagar-button"]').length;
                        if (totalBotoes > 0) {
                            cy.get('[data-cy="apagar-button"]').click({multiple: true});
                            if (totalBotoes === 1) {
                                // Se era o último botão, espera ele sumir completamente
                                cy.get('[data-cy="apagar-button"]').should('not.exist');
                            } else {
                                // Se tem vários botões, espera a quantidade reduzir em exatamente 1
                                cy.get('[data-cy="apagar-button"]').should('have.length', totalBotoes - 1);
                            }
                            apagarAreas();
                        }
                    });
                };
                apagarAreas();
            
                cy.get('[data-cy="add-areas-de-conhecimento"]').click();
            
                cy.get('[data-cy="search-grande-area-id"]').type(dados.grandeArea + '{enter}');
            
                cy.get('[data-cy="search-area-id"]').type(dados.area + '{enter}');
            
                cy.get('[data-cy="search-sub-area-id"]').type(dados.subArea + '{enter}');
            
                cy.get('[data-cy="search-especialidade-id"]').type(dados.especialidade + '{enter}');
                
                cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();
            
                cy.get('[data-cy="menu-salvar"]').click();
            
            });
            cy.get('#root div.css-9qbsp5').should('have.text', 'SucessoSalvo com sucesso!');
        });
        it("Vai para sub-seção \"Dados Profissionais\" e preenche os campos vindos da fixture e salvar.", () => {
            cy.fixture("completar-cadastro").then((dados) => {
            
                cy.get('[data-cy="dados-profissionais"]').click();
            
                cy.get('body').then(($body) => {
                    if (!$body.find('[data-cy="possui-vinculo-institucional"]').is(':checked'))
                        cy.get('[data-cy="possui-vinculo-institucional-box"]').click();
                });
                cy.get('[data-cy="search-tipo-vinculo-instituciona"]').clear().type(dados.vinculo + '{enter}');
            
                cy.get('body').then(($body) => {
                    if (!$body.find('[data-cy="possui-vinculo-empregaticio-box"]').is(':checked'))
                        cy.get('[data-cy="possui-vinculo-empregaticio-box"]').click();
                });
            
                cy.get('[data-cy="vinculoInstitucional.inicioServico"]').clear().type(dados.inicioServico);
            
                cy.get('[data-cy="search-regime-trabalho-id"]').clear().type(dados.regime + '{enter}');
            
                cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dados.cargo);
            
                cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear().type(dados.inicioCargo);
            
                cy.get('[data-cy="menu-salvar"]').click();
            
            });
            cy.get('span.css-5bljoh').should('have.text', 'Sucesso');
        });
        it("Vai para sub-seção \"Documentos Pessoais\" e submete os arquivos e salvar.", () => {
            
            cy.get('[data-cy="documentos-pessoais"]').click();
            
            const apagarAreas = () => {
                cy.get('body').then(($body) => {
                    const totalBotoes = $body.find('.svg-inline--fa.fa-trash').length;
                    if (totalBotoes > 0) {
                        cy.get('.svg-inline--fa.fa-trash').click({multiple: true});//Sugiro que criem um data-cy para isso
                        if (totalBotoes === 1) {
                            // Se era o último botões, espera ele sumir completamente
                            cy.get('.svg-inline--fa.fa-trash').should('not.exist');
                        } else {
                            // Se tem vários botões, espera a quantidade reduzir em exatamente 1
                            cy.get('.svg-inline--fa.fa-trash').should('have.length', totalBotoes - 1);
                        }
                        apagarAreas();
                    }
                });
            };
            apagarAreas();
            
            cy.get('.css-4jgibr.e1nj8mux6').click();//Sugiro que criem um data-cy para isso
            
            cy.get('[data-cy="documento-de-identificacao-com-f"]').click();
            
            cy.get('[data-cy="usuarioAnexo-upload"]').selectFile('../SIGFAP-CYPRESS/cypress/fixtures/documento-com-foto.pdf',{
                force: true
            });
            
            cy.get('[data-cy="menu-finalizar"]').click();
            
            cy.get('[data-cy="user-menu"]').should("be.visible");
            cy.get('span.css-5bljoh').should('have.text', 'Sucesso');
        });
    });
});
