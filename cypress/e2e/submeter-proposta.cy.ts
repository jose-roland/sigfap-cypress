import { toCyString } from "../helpers/kebab.helper";

describe("Submeter uma proposta", () => {
  context(
    "Submeter uma proposta com todos os dados válidos (caminho feliz)",
    () => {
      before(() => {
        cy.visit("/");
        cy.fixture("criar-conta").then((dados) => {
          cy.typeLogin(dados.email, dados.senha);
        });
        cy.fixture("submeter-proposta(befores)").then((dados) => {
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
          cy.get(".css-kexj09.elzkvqq38").click();
          const removerFiltros = () => {
            cy.get("body").then(($body) => {
              const totalBotoes = $body.find(".css-1ibkshd.elzkvqq25").length;
              if (totalBotoes > 0) {
                cy.get(".css-1ibkshd.elzkvqq25").first().click();
                if (totalBotoes === 1) {
                  cy.get(".css-1ibkshd.elzkvqq25").should("not.exist");
                } else {
                  cy.get(".css-1ibkshd.elzkvqq25").should(
                    "have.length",
                    totalBotoes - 1,
                  );
                }
                removerFiltros();
              }
            });
          };
          removerFiltros();
          cy.get('[data-cy="add-filter-select"]').click();
          cy.get('[data-cy="titulo"]').click();
          cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
          cy.get(".css-ncst9s.elzkvqq19").click();

          // CORREÇÃO: Pausa para a tabela atualizar e evitar o erro "Detached DOM"
          cy.wait(2000);
          cy.get(
            "#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68 > svg",
          ).click({ force: true });
        });
      });

      after(() => {
        cy.visit("/");

        // CORREÇÃO: Aguardar a Home carregar para o Cypress encontrar o botão Ver Mais
        cy.wait(2000);

        cy.fixture("submeter-proposta(befores)").then((dados) => {
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
                  cy.get(".css-1ibkshd.elzkvqq25").should(
                    "have.length",
                    totalBotoes - 1,
                  );
                }
                removerFiltros();
              }
            });
          };
          removerFiltros();
          cy.get('[data-cy="add-filter-select"]').click();
          cy.get('[data-cy="titulo"]').click();
          cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
          cy.get(".css-ncst9s.elzkvqq19").click();

          // CORREÇÃO: Pausa para a tabela atualizar e evitar o erro "Detached DOM"
          cy.wait(2000);
          cy.get(
            "#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(3) > button.css-ylpd68 > svg.css-16snoe8",
          ).click({ force: true });
          cy.get('[data-cy="sim-continuar-button"]').click();
          cy.get('[data-cy="confirmar-button"]').click();
          cy.visit("/");
        });
      });

      //   context("Caracterização", () => {
      //     it('Preenche a seção de "Informações Iniciais" com dados válidos e salva.', () => {
      //       cy.fixture("submeter-proposta").then((dados) => {
      //         //   cy.get('[data-cy="edital.nome"]').clear().type(dados.tituloProjeto);

      //         cy.get('[data-cy="duracao"]').clear().type(dados.duracao);

      //         cy.get('[data-cy="search-instituicao-executora-id"]')
      //           .clear()
      //           .type(dados.instituicao);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-instituicao-executora-id"]').type(
      //           "{downarrow}{enter}",
      //         );

      //         cy.get('[data-cy="search-unidade-executora-id"]')
      //           .clear()
      //           .type(dados.unidade);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-unidade-executora-id"]').type(
      //           "{downarrow}{enter}",
      //         );
      //         cy.get('[data-cy="menu-salvar"]').click();
      //         cy.wait(1000);
      //         cy.contains("Salvo com sucesso!").should("be.visible");
      //       });
      //     });

      //     it('Adiciona uma Área de Conhecimento na seção "Informações Iniciais".', () => {
      //       cy.fixture("submeter-proposta").then((dados) => {
      //         cy.get('[data-cy="add-areas-de-conhecimento"]').click();

      //         cy.get('[data-cy="search-grande-area-id"]')
      //           .clear()
      //           .type(dados.grandeArea);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-grande-area-id"]').type(
      //           "{downarrow}{enter}",
      //         );

      //         cy.get('[data-cy="search-area-id"]').clear().type(dados.area);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-area-id"]').type("{downarrow}{enter}");

      //         cy.get('[data-cy="search-sub-area-id"]')
      //           .clear()
      //           .type(dados.subArea);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-sub-area-id"]').type("{downarrow}{enter}");

      //         cy.get('[data-cy="search-especialidade-id"]')
      //           .clear()
      //           .type(dados.especialidade);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-especialidade-id"]').type(
      //           "{downarrow}{enter}",
      //         );

      //         cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();

      //         cy.get('[data-cy="menu-salvar"]').click();

      //         cy.wait(1000);
      //         cy.contains("Salvo com sucesso!").should("be.visible");
      //       });
      //     });

      //     it('Preenche "Informações Complementares" com dados válidos e salva.', () => {
      //       cy.get('[data-cy="informacoes-complementares"]').click();

      //       cy.fixture("submeter-proposta").then((dados) => {
      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-28-item-ods01-erradicar-a-pobreza-em-tod"]',
      //         ).click();

      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-29-item-grande-faturamento-ano-acima-de"]',
      //         ).click();

      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-30-item-agronegocios"]',
      //         ).click();

      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-31"]',
      //         )
      //           .clear()
      //           .type(dados.ocupacaoEquipe);

      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-32"]',
      //         )
      //           .clear()
      //           .type(dados.dataEvento);

      //         cy.get(
      //           '[id="formularioPropostaInformacaoComplementar.pergunta-32-label"]',
      //         ).click();

      //         cy.get(
      //           '[data-cy="formularioPropostaInformacaoComplementar.pergunta-224-item-it-is-a-long-established-fact-th"]',
      //         ).click();

      //         cy.get('[data-cy="menu-salvar"]').click();

      //         cy.wait(1000);

      //         cy.contains("Salvo com sucesso!").should("be.visible");
      //       });
      //     });

      //     it('Preenche "Abrangência" com dados válidos e salva.', () => {
      //       cy.contains("Abrangência").click();

      //       cy.fixture("submeter-proposta").then((dados) => {
      //         cy.get('[data-cy="add-button"]').click();

      //         cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-estado-id"]').type("{downarrow}{enter}");

      //         cy.get('[data-cy="search-abrangencia-municipio"]')
      //           .clear()
      //           .type(dados.municipio);
      //         cy.wait(1000);
      //         cy.get('[data-cy="search-abrangencia-municipio"]').type("{enter}");
      //         cy.get("body").click(0, 0);

      //         cy.get('[data-cy="abrangencia-confirmar"]').click();

      //         cy.get('[data-cy="menu-salvar"]').click();
      //         cy.wait(1000);
      //         cy.contains("Salvo com sucesso!").should("be.visible");
      //       });
      //     });
      //   });

      context("Coordenação", () => {
        it('Preenche "Dados Pessoais" em "Coordenação" com dados válidos e salva.', () => {
          cy.contains("Coordenação").click();
          cy.get('[data-cy="dados-pessoais"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="criadoPor.nome"]')
              .clear()
              .type(dados.coordenadorNome);

            cy.get('[data-cy="search-sexo"]').clear().type(dados.sexo);
            cy.wait(1000);
            cy.get('[data-cy="search-sexo"]').type("{downarrow}{enter}");

            cy.get('[data-cy="search-pais-id"]').clear().type(dados.pais);
            cy.wait(1000);
            cy.get('[data-cy="search-pais-id"]').type("{downarrow}{enter}");

            cy.get('[data-cy="criadoPor.dataNascimento"]')
              .clear()
              .type(dados.dataNascimento);
            cy.get("body").click(0, 0);

            cy.get(".ddi").type(dados.pais + "{downarrow}{enter}");
            cy.wait(1000);

            // cy.get('[data-cy="criadoPor.celular"]').clear().type(dados.celular);
            // cy.get('[data-cy="criadoPor.celular"]')
            //   .invoke("val", "")
            //   .trigger("input")
            //   .type(dados.celular);

            cy.get('[data-cy="search-raca-cor-id"]')
              .clear()
              .type(dados.racaCor);
            cy.wait(1000);
            cy.get('[data-cy="search-raca-cor-id"]').type("{downarrow}{enter}");

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });
      });

      //   it('Vai para seção "Apresentação" e preenche e salva.', () => {
      //     cy.contains("Apresentação").click();

      //     cy.get('[data-cy="menu-salvar"]').click();
      //   });

      //   it('Vai para seção "Anexos" e preenche e salva.', () => {
      //     cy.contains("Anexos").click();

      //     cy.get("#select-categories-documento-proposta-anexo").click();
      //     cy.get('[data-cy="documento-1"]').click();

      //     cy.get('input[type="file"]').selectFile(
      //       "cypress/fixtures/documento-com-foto.pdf",
      //       { force: true },
      //     );

      //     cy.get('[data-cy="menu-salvar"]').click();
      //   });

      //   it('Vai para seção "Finalização" e submete a proposta.', () => {
      //     cy.contains("Finalização").click();

      //     cy.get('[data-cy="menu-verificar-pendencias"]').click();

      //     cy.get('[data-cy="menu-salvar"]').click();

      //     cy.get('class="css-1ky4us2 ens3bun6"').first().should("be.visible");
      //   });
    },
  );

  context(
    "Preencher Informações Iniciais com dados inválidos (caminho tenebroso)",
    () => {
      before(() => {
        cy.visit("/");
        cy.fixture("criar-conta").then((dados) => {
          cy.typeLogin(dados.email, dados.senha);
        });
        cy.fixture("submeter-proposta(befores)").then((dados) => {
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
        cy.fixture("submeter-proposta(befores)").then((dados) => {
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
                  cy.get(".css-1ibkshd.elzkvqq25").should(
                    "have.length",
                    totalBotoes - 1,
                  );
                }
                removerFiltros();
              }
            });
          };
          removerFiltros();
          cy.get('[data-cy="add-filter-select"]').click();
          cy.get('[data-cy="titulo"]').click();
          cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
          cy.get(".css-ncst9s.elzkvqq19").click();

          cy.wait(2000);
          cy.get(
            "#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(2) > button.css-ylpd68 > svg",
          ).click({ force: true });
        });
      });

      after(() => {
        cy.visit("/");

        cy.wait(2000);

        cy.fixture("submeter-proposta(befores)").then((dados) => {
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
                  cy.get(".css-1ibkshd.elzkvqq25").should(
                    "have.length",
                    totalBotoes - 1,
                  );
                }
                removerFiltros();
              }
            });
          };
          removerFiltros();
          cy.get('[data-cy="add-filter-select"]').click();
          cy.get('[data-cy="titulo"]').click();
          cy.get('[data-cy="filters.titulo"]').type(dados.titulo);
          cy.get(".css-ncst9s.elzkvqq19").click();

          cy.wait(2000);
          cy.get(
            "#root div:nth-child(1) > div.css-k9f5ec > div.css-kbi0st > div.css-xb68j8 > div.css-vsxyhc > div:nth-child(3) > button.css-ylpd68 > svg.css-16snoe8",
          ).click({ force: true });
          cy.get('[data-cy="sim-continuar-button"]').click();
          cy.get('[data-cy="confirmar-button"]').click();
          cy.visit("/");
        });
      });

      it('Exibe warning ao tentar salvar "Informações Iniciais" sem preencher nenhum campo.', () => {
        cy.get('[data-cy="edital.nome"]').clear();

        cy.get('[data-cy="menu-salvar"]').click();

        cy.get("#titulo-helper").should("be.visible");
      });
    },
  );
});
