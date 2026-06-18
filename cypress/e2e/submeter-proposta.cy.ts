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

      context("Caracterização", () => {
        beforeEach(() => cy.get('[data-cy="caracterizacao"]').click());

        it('Preenche a seção de "Informações Iniciais" com dados válidos e salva.', () => {
          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="duracao"]').clear().type(dados.duracao);

            cy.get('[data-cy="search-instituicao-executora-id"]')
              .clear()
              .type(dados.instituicao);
            cy.wait(1000);
            cy.get('[data-cy="search-instituicao-executora-id"]').type(
              "{enter}",
            );

            cy.get('[data-cy="search-unidade-executora-id"]')
              .clear()
              .type(dados.unidade);
            cy.wait(1000);
            cy.get('[data-cy="search-unidade-executora-id"]').type("{enter}");
            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Adiciona uma Área de Conhecimento na seção "Informações Iniciais".', () => {
          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="add-areas-de-conhecimento"]').click();

            cy.get('[data-cy="search-grande-area-id"]')
              .clear()
              .type(dados.grandeArea);
            cy.wait(1000);
            cy.get('[data-cy="search-grande-area-id"]').type("{enter}");

            cy.get('[data-cy="search-area-id"]').clear().type(dados.area);
            cy.wait(1000);
            cy.get('[data-cy="search-area-id"]').type("{enter}");

            cy.get('[data-cy="search-sub-area-id"]')
              .clear()
              .type(dados.subArea);
            cy.wait(1000);
            cy.get('[data-cy="search-sub-area-id"]').type("{enter}");

            cy.get('[data-cy="search-especialidade-id"]')
              .clear()
              .type(dados.especialidade);
            cy.wait(1000);
            cy.get('[data-cy="search-especialidade-id"]').type("{enter}");

            cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();

            cy.get('[data-cy="menu-salvar"]').click();

            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Informações Complementares" com dados válidos e salva.', () => {
          cy.get('[data-cy="informacoes-complementares"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-28-item-ods01-erradicar-a-pobreza-em-tod"]',
            ).click();

            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-29-item-grande-faturamento-ano-acima-de"]',
            ).click();

            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-30-item-agronegocios"]',
            ).click();

            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-31"]',
            )
              .clear()
              .type(dados.ocupacaoEquipe);

            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-32"]',
            )
              .clear()
              .type(dados.dataEvento);

            cy.get(
              '[id="formularioPropostaInformacaoComplementar.pergunta-32-label"]',
            ).click();

            cy.get(
              '[data-cy="formularioPropostaInformacaoComplementar.pergunta-224-item-it-is-a-long-established-fact-th"]',
            ).click();

            cy.get('[data-cy="menu-salvar"]').click();

            cy.wait(1000);

            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Abrangência" com dados válidos e salva.', () => {
          cy.contains("Abrangência").click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="add-button"]').click();

            cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado);
            cy.wait(1000);
            cy.get('[data-cy="search-estado-id"]').type("{enter}");

            cy.get('[data-cy="search-abrangencia-municipio"]')
              .clear()
              .type(dados.municipio);
            cy.wait(1000);
            cy.get('[data-cy="search-abrangencia-municipio"]').type("{enter}");
            cy.get("body").click(0, 0);

            cy.get('[data-cy="abrangencia-confirmar"]').click();

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });
      });

      context("Coordenação", () => {
        beforeEach(() => cy.get('[data-cy="coordenacao"]').click());

        it('Preenche "Dados Pessoais" em "Coordenação" com dados válidos e salva.', () => {
          cy.get('[data-cy="dados-pessoais"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="criadoPor.nome"]')
              .clear()
              .type(dados.coordenadorNome);

            cy.get('[data-cy="search-sexo"]').clear().type(dados.sexo);
            cy.wait(1000);
            cy.get('[data-cy="search-sexo"]').type("{enter}");

            cy.get('[data-cy="search-pais-id"]').clear().type(dados.pais);
            cy.wait(1000);
            cy.get('[data-cy="search-pais-id"]').type("{enter}");

            cy.get('[data-cy="criadoPor.dataNascimento"]')
              .clear()
              .type(dados.dataNascimento);
            cy.get("body").click(0, 0);

            cy.get(".ddi").type(dados.pais + "{enter}");
            cy.wait(1000);

            cy.get('[data-cy="criadoPor.celular"]')
              .focus()
              .clear()
              .type(dados.celular, { delay: 50, force: true });

            cy.get('[data-cy="search-raca-cor-id"]')
              .clear()
              .type(dados.racaCor);
            cy.wait(1000);
            cy.get('[data-cy="search-raca-cor-id"]').type("{enter}");

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Endereço" em "Coordenação" (fluxo Brasil) com dados válidos e salva.', () => {
          cy.get('[data-cy="endereco"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="criadoPor.endereco.cep"]')
              .clear()
              .type(dados.cep);
            cy.wait(1000);

            cy.get('[data-cy="criadoPor.endereco.bairro"]')
              .clear()
              .type(dados.bairro);

            cy.get('[data-cy="search-estado"]').clear().type(dados.estado);
            cy.wait(1000);
            cy.get('[data-cy="search-estado"]').type("{enter}");

            cy.get('[data-cy="criadoPor.endereco.numero"]')
              .clear()
              .type(dados.numero);

            cy.get('[data-cy="criadoPor.endereco.logradouro"]')
              .clear()
              .type(dados.logradouro);

            cy.get('[data-cy="search-municipio"]')
              .clear()
              .type(dados.enderecoMunicipio)
              .type("{enter}");

            cy.get('[data-cy="criadoPor.endereco.complemento"]')
              .clear()
              .type(dados.complemento);

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Dados Acadêmicos" em "Coordenação" com dados válidos e salva.', () => {
          cy.get('[data-cy="dados-academicos"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="search-instituicao-id"]')
              .clear()
              .type(dados.instituicao);
            cy.wait(1000);
            cy.get('[data-cy="search-instituicao-id"]').type("{enter}");

            cy.get('[data-cy="search-unidade-id"]').clear().type(dados.unidade);
            cy.wait(1000);
            cy.get('[data-cy="search-unidade-id"]').type("{enter}");

            cy.get('[data-cy="search-nivel-academico-id"]')
              .clear()
              .type(dados.nivelAcademico);
            cy.wait(1000);
            cy.get('[data-cy="search-nivel-academico-id"]').type("{enter}");

            cy.get('[data-cy="add-areas-de-conhecimento"]').click();

            cy.get('[data-cy="search-grande-area-id"]')
              .clear()
              .type(dados.grandeArea);
            cy.wait(1000);
            cy.get('[data-cy="search-grande-area-id"]').type("{enter}");

            cy.get('[data-cy="search-area-id"]').clear().type(dados.area);
            cy.wait(1000);
            cy.get('[data-cy="search-area-id"]').type("{enter}");

            cy.get('[data-cy="search-sub-area-id"]')
              .clear()
              .type(dados.subArea);
            cy.wait(1000);
            cy.get('[data-cy="search-sub-area-id"]').type("{enter}");

            cy.get('[data-cy="search-especialidade-id"]')
              .clear()
              .type(dados.especialidade);
            cy.wait(1000);
            cy.get('[data-cy="search-especialidade-id"]').type("{enter}");

            cy.get(
              '[data-cy="criadoPor.areaDeConhecimento-confirmar"]',
            ).click();

            cy.get('[data-cy="criadoPor.lattes"]').clear().type(dados.lattes);

            cy.get('[data-cy="criadoPor.linkedin"]')
              .clear()
              .type(dados.linkedin);

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Dados Profissionais" em "Coordenação" com dados válidos e salva.', () => {
          cy.get('[data-cy="dados-profissionais"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="possui-vinculo-institucional-box"]').then(
              ($el) => {
                const marcado = $el.find('svg[visible="true"]').length > 0;
                if (!marcado) {
                  cy.wrap($el).click();
                }
              },
            );

            cy.get('[data-cy="search-tipo-vinculo-instituciona"]')
              .clear()
              .type(dados.tipoVinculo);
            cy.wait(1000);
            cy.get('[data-cy="search-tipo-vinculo-instituciona"]').type(
              "{enter}",
            );

            cy.get('[data-cy="possui-vinculo-empregaticio-box"]').then(
              ($checkbox) => {
                if (!$checkbox.is(":checked")) {
                  cy.wrap($checkbox).click();
                }
              },
            );

            cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]')
              .clear()
              .type(dados.inicioServico);
            cy.get("body").click(0, 0);

            cy.get('[data-cy="search-regime-trabalho-id"]')
              .clear()
              .type(dados.regimeTrabalho);
            cy.wait(1000);
            cy.get('[data-cy="search-regime-trabalho-id"]').type("{enter}");

            cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]')
              .clear()
              .type(dados.funcao);

            cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]')
              .clear()
              .type(dados.inicioFuncao);
            cy.get("body").click(0, 0);

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });
      });

      context("Apresentação", () => {
        beforeEach(() => cy.get('[data-cy="apresentacao"]').click());
        it('Preenche "Descrição" em "Apresentação" com dados válidos e salva.', () => {
          cy.get('[data-cy="descricao"]').click();

          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-33"]')
              .clear()
              .type(dados.informacoesRelevantes);

            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-34"]')
              .clear()
              .type(dados.experienciaCoordenador);

            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-36"]')
              .clear()
              .type(dados.objetivoGeral);

            cy.get(
              '[data-cy="formularioPropostaDescritiva.pergunta-37-item-aa"]',
            ).click();

            cy.get(
              '[data-cy="formularioPropostaDescritiva.pergunta-38-item-aa"]',
            ).click();

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it('Preenche "Indicadores de Produção" e salva.', () => {
          cy.get('[data-cy="indicadores-de-producao"]').click();

          cy.get("table tbody tr td input").each(($input) => {
            cy.wrap($input).clear().type("1");
          });

          cy.get('[data-cy="menu-salvar"]').click();
          cy.wait(1000);
          cy.contains("Salvo com sucesso!").should("be.visible");
        });

        it("Adiciona um pesquisador membro, define sua função e salva.", () => {
          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="membros"]').click();
            cy.get('[data-cy="nome-do-pesquisador"]').type("{enter}");

            cy.contains("Adicionar").click();
            cy.get('[data-cy="sim-continuar-button"]').click();
            cy.get('[data-cy="confirmar-button"]').click();

            cy.get("table tbody tr td div div div input")
              .clear()
              .type(dados.funcaoMembro);
            cy.wait(1000);
            cy.get("table tbody tr td div div div input").type("{enter}");

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        it("Adiciona uma atividade com dados válidos e salva.", () => {
          cy.fixture("submeter-proposta").then((dados) => {
            cy.get('[data-cy="atividades"]').click();
            cy.get('[data-cy="add-button"]').click();

            cy.get('[data-cy="propostaAtividadeForm.titulo"]')
              .clear()
              .type(dados.atividadeTitulo);

            cy.get('[data-cy="propostaAtividadeForm.descricao"]')
              .clear()
              .type(dados.atividadeDescricao);

            cy.get('[data-cy="search-mes-inicio"]').clear().type(dados.mes);
            cy.wait(1000);
            cy.get('[data-cy="search-mes-inicio"]').type("{enter}");

            cy.get('[data-cy="search-duracao"]')
              .clear()
              .type(dados.duracaoMeses);
            cy.wait(1000);
            cy.get('[data-cy="search-duracao"]').type("{enter}");

            cy.get('[data-cy="search-carga-horaria-semanal"]')
              .clear()
              .type(dados.cargaHoraria);
            cy.wait(1000);
            cy.get('[data-cy="search-carga-horaria-semanal"]').type("{enter}");

            cy.get('[data-cy="propostaAtividade-confirmar"]').click();

            cy.get('[data-cy="menu-salvar"]').click();
            cy.wait(1000);
            cy.contains("Salvo com sucesso!").should("be.visible");
          });
        });

        context("Orçamento", () => {
          beforeEach(() => cy.get('[data-cy="orcamento"]').click());

          it("Adiciona uma diária nacional (Brasil) com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="diarias"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-pais-id"]').clear().type(dados.pais);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-id"]').type("{enter}");

              cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado);
              cy.wait(1000);
              cy.get('[data-cy="search-estado-id"]').type("{enter}");

              cy.get('[data-cy="search-municipio"]')
                .clear()
                .type(dados.municipio);
              cy.wait(1000);
              cy.get('[data-cy="search-municipio"]').type("{enter}");

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaDiariaForm.numeroDiaria"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaDiariaForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaDiaria-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma diária internacional com moeda estrangeira e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="diarias"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-pais-id"]')
                .clear()
                .type(dados.paisInternacional);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-id"]').type("{enter}");

              cy.get('[data-cy="rubricaDiariaForm.estadoRegiao"]')
                .clear()
                .type(dados.estadoRegiao);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaDiariaForm.numeroDiaria"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaDiariaForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="tem-moeda-estrangeira-box"]').click();

              cy.get('[data-cy="search-moeda-estrangeira-id"]')
                .clear()
                .type(dados.moedaEstrangeira);
              cy.wait(1000);
              cy.get('[data-cy="search-moeda-estrangeira-id"]').type("{enter}");

              cy.get('[data-cy="rubricaDiariaForm.justificativa"]')
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="rubricaDiaria-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona um material de consumo com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="material-de-consumo"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="rubricaMaterialConsumoForm.especificacao"]')
                .clear()
                .type(dados.especificacao);

              cy.get('[data-cy="search-unidade-medida"]')
                .clear()
                .type(dados.materialUnidadeMedida);
              cy.wait(1000);
              cy.get('[data-cy="search-unidade-medida"]').type("{enter}");

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaMaterialConsumoForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaMaterialConsumoForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona um material permanente com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="material-permanente"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="rubricaMaterialPermanenteForm.especificacao"]')
                .clear()
                .type(dados.especificacao);

              cy.get('[data-cy="search-tipo-origem"]')
                .clear()
                .type(dados.materialPermanenteTipoOrigem)
                .type("{enter}");
              cy.wait(1000);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);

              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaMaterialPermanenteForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaMaterialPermanenteForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma passagem nacional com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="passagens"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-trecho"]')
                .clear()
                .type(dados.passagemTrechoNacional);
              cy.wait(1000);
              cy.get('[data-cy="search-trecho"]').type("{enter}");

              cy.get('[data-cy="search-tipo"]')
                .clear()
                .type(dados.passagemTipo);
              cy.wait(1000);
              cy.get('[data-cy="search-tipo"]').type("{enter}");

              cy.get('[data-cy="search-estado-origem-id"]')
                .clear()
                .type(dados.passagemEstadoOrigem);
              cy.wait(1000);
              cy.get('[data-cy="search-estado-origem-id"]').type("{enter}");

              cy.get('[data-cy="search-municipio-origem"]')
                .clear()
                .type(dados.passagemMunicipioOrigem);
              cy.wait(1000);
              cy.get('[data-cy="search-municipio-origem"]').type("{enter}");

              cy.get('[data-cy="estado-destino-id"]')
                .clear()
                .type(dados.estado);
              cy.wait(1000);
              cy.get('[data-cy="estado-destino-id"]').type("{enter}");

              cy.get('[data-cy="search-municipio-destino"]')
                .clear()
                .type(dados.municipio);
              cy.wait(1000);
              cy.get('[data-cy="search-municipio-destino"]').type("{enter}");

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaPassagemForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaPassagemForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaPassagem-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma passagem internacional com moeda estrangeira e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="passagens"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-trecho"]')
                .clear()
                .type(dados.passagemTrechoInternacional);
              cy.wait(1000);
              cy.get('[data-cy="search-trecho"]').type("{enter}");

              cy.get('[data-cy="search-tipo"]')
                .clear()
                .type(dados.passagemTipo);
              cy.wait(1000);
              cy.get('[data-cy="search-tipo"]').type("{enter}");

              cy.get('[data-cy="search-pais-origem-id"]')
                .clear()
                .type(dados.paisInternacional);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-origem-id"]').type("{enter}");

              cy.get('[data-cy="rubricaPassagemForm.estadoRegiaoOrigem"]')
                .clear()
                .type(dados.estadoRegiao);

              cy.get('[data-cy="search-pais-destino-id"]')
                .clear()
                .type(dados.passagemPaisDestino);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-destino-id"]').type("{enter}");

              cy.get('[data-cy="rubricaPassagemForm.estadoRegiaoDestino"]')
                .clear()
                .type(dados.estadoRegiaoDestino);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaPassagemForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get('[data-cy="rubricaPassagemForm.custoUnitario"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="tem-moeda-estrangeira-box"]').click();

              cy.get('[data-cy="search-moeda-estrangeira-id"]')
                .clear()
                .type(dados.moedaEstrangeira);
              cy.wait(1000);
              cy.get('[data-cy="search-moeda-estrangeira-id"]').type("{enter}");

              cy.get('[data-cy="rubricaPassagemForm.justificativa"]')
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="rubricaPassagem-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma hospedagem e alimentação nacional (Brasil) com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="hospedagem-e-alimentacao"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-pais-id"]').clear().type(dados.pais);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-id"]').type("{enter}");

              cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado);
              cy.wait(1000);
              cy.get('[data-cy="search-estado-id"]').type("{enter}");

              cy.get('[data-cy="search-municipio"]')
                .clear()
                .type(dados.municipio);
              cy.wait(1000);
              cy.get('[data-cy="search-municipio"]').type("{enter}");

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.especificacao"]',
              )
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaHospedagemAlimentacaoForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.custoUnitario"]',
              )
                .clear()
                .type(dados.custoUnitario);

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacao-confirmar"]',
              ).click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma hospedagem e alimentação internacional com moeda estrangeira e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="hospedagem-e-alimentacao"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="search-pais-id"]')
                .clear()
                .type(dados.paisInternacional);
              cy.wait(1000);
              cy.get('[data-cy="search-pais-id"]').type("{enter}");

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.estadoRegiao"]',
              )
                .clear()
                .type(dados.estadoRegiao);

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.especificacao"]',
              )
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaHospedagemAlimentacaoForm.quantidade"]')
                .clear()
                .type(dados.quantidade);

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.custoUnitario"]',
              )
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="tem-moeda-estrangeira-box"]').click();

              cy.get('[data-cy="search-moeda-estrangeira-id"]')
                .clear()
                .type(dados.moedaEstrangeira);
              cy.wait(1000);
              cy.get('[data-cy="search-moeda-estrangeira-id"]').type("{enter}");

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacaoForm.justificativa"]',
              )
                .clear()
                .type(dados.justificativa);

              cy.get(
                '[data-cy="rubricaHospedagemAlimentacao-confirmar"]',
              ).click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona um serviço de terceiros com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="servicos-de-terceiros"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="rubricaServicoTerceiroForm.especificacao"]')
                .clear()
                .type(dados.especificacao);

              cy.get('[data-cy="search-tipo"]').clear().type(dados.servicoTipo);
              cy.wait(1000);
              cy.get('[data-cy="search-tipo"]').type("{enter}");

              cy.get('[data-cy="rubricaServicoTerceiroForm.valorTotal"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaServicoTerceiro-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona uma rubrica de pessoal com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="pessoal"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="rubricaPessoalForm.funcao"]')
                .clear()
                .type(dados.pessoalFuncao);

              cy.get('[data-cy="rubricaPessoalForm.formacaoProfissional"]')
                .clear()
                .type(dados.pessoalFormacaoProfissional);

              cy.get('[data-cy="rubricaPessoalForm.perfilDesejado"]')
                .clear()
                .type(dados.pessoalPerfilDesejado);

              cy.get('[data-cy="search-carga-horaria-semanal"]')
                .clear()
                .type(dados.cargaHoraria);
              cy.wait(1000);
              cy.get('[data-cy="search-carga-horaria-semanal"]').type(
                "{enter}",
              );

              cy.get('[data-cy="search-mes-inicio"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-inicio"]').type("{enter}");

              cy.get('[data-cy="search-duracao"]')
                .clear()
                .type(dados.duracaoMeses);
              cy.wait(1000);
              cy.get('[data-cy="search-duracao"]').type("{enter}");

              cy.get('[data-cy="rubricaPessoalForm.custoHoraCustoMes"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaPessoalForm.valorTotal"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="rubricaPessoalForm.justificativa"]')
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="rubricaPessoal-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });

          it("Adiciona um encargo com dados válidos e salva.", () => {
            cy.fixture("submeter-proposta").then((dados) => {
              cy.get('[data-cy="encargos"]').click();
              cy.get('[data-cy="add-button"]').click();

              cy.get('[data-cy="rubricaEncargoForm.especificacao"]')
                .clear()
                .type(dados.especificacao);

              cy.get('[data-cy="rubricaEncargoForm.valorTotal"]')
                .clear()
                .type(dados.custoUnitario);

              cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
              cy.wait(1000);
              cy.get('[data-cy="search-mes-previsto"]').type("{enter}");

              cy.get('[data-cy="rubricaEncargoForm.justificativa"]')
                .clear()
                .type(dados.justificativa);

              cy.get('[data-cy="rubricaEncargo-confirmar"]').click();

              cy.get('[data-cy="menu-salvar"]').click();
              cy.wait(1000);
              cy.contains("Salvo com sucesso!").should("be.visible");
            });
          });
        });
      });

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
