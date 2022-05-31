// Aja testi komentorivillä ao. komennolla (siinä hakemistossa missä on t1-11.test.js tiedosto)
// npx cypress run -r ./CypressReporter.js -s ./t17a-e.test.js -q

let testFolder = "./";


describe('Tehtävä 17a', () => {

    let testfile = testFolder + "teht17a.html"; 

    it('Tehtävä 17a: näyttö vähintään lg, hampurilaisnappi piilossa', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.navbar-toggler').then(($el) => {
            let r = Cypress.dom.isHidden($el);
            expect(r).to.equal(true);
        })

    });

    it('Tehtävä 17a: näyttö vähintään lg, Alkuun, Wilma, Reppu, Työkalut näkyvissä', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        // Alkuun, Wilma, Reppu, Työkalut näkyvissä
        cy.contains('Alkuun').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})
        cy.contains('Wilma').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})
        cy.contains('Reppu').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})
        cy.contains('Työkalut').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})

    });

    it('Tehtävä 17a: näyttö vähintään lg, Kirjaudu-form näkyvissä', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        // form näkyvissä
        cy.get('.navbar').find("form").within(() => {
            cy.get('input:first').should('have.attr', 'placeholder', 'Tunnus')
            cy.get('input:last').should('have.attr', 'placeholder', 'Salasana')
            cy.get('button').contains("Kirjaudu");
          })

    });


    it('Tehtävä 17a: näyttö alle md, hampurilaisnappi näkyvissä', () => {
        cy.viewport(700,900);
        cy.visit(testfile);

        cy.get('.navbar-toggler').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})

    });

    it('Tehtävä 17a: näyttö alle md, Alkuun, Wilma, Reppu, Työkalut piilossa', () => {
        cy.viewport(700,900);
        cy.visit(testfile);

        // Alkuun, Wilma, Reppu, Työkalut piilossa
        cy.contains('Alkuun').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(true);})
        cy.contains('Wilma').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(true);})
        cy.contains('Reppu').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(true);})
        cy.contains('Työkalut').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(true);})

    });

    it('Tehtävä 17a: näyttö alle md, Kirjaudu-form näkyvissä', () => {
        cy.viewport(700,900);
        cy.visit(testfile);

        // form näkyvissä
        cy.get('.navbar').find("form").then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})

    });
});

describe('Tehtävä 17b', () => {

    let testfile = testFolder + "teht17a.html"; 

    it('Tehtävä 17b: Opiskelijanumero-form löytyy', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.navbar + .container-fluid').find("form").within(() => {            
            cy.get('input:first').should('have.attr', 'placeholder', 'Opiskelijanumero')
            cy.get("label").contains('Opiskelijanumero').next().should('have.attr', 'placeholder', 'Opiskelijanumero')
            cy.get("label").contains('Aloitusvuosi').next().should('have.attr', 'placeholder', 'Aloitusvuosi')
            cy.get('button').contains("Tarkista");
          })
    });

    it('Tehtävä 17b: tarkistetaan Opiskelijanumero-formin sarake-asetukset ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.navbar + .container-fluid').within(() => {            
            cy.get(".row");    

            cy.get(".col-md-4").within(() => {
                cy.get('input:first').should('have.attr', 'placeholder', 'Opiskelijanumero')
                cy.get("label").contains('Opiskelijanumero').next().should('have.attr', 'placeholder', 'Opiskelijanumero')
                cy.get("label").contains('Aloitusvuosi').next().should('have.attr', 'placeholder', 'Aloitusvuosi')
                cy.get('button').contains("Tarkista");
            });
        })
    });
});

describe('Tehtävä 17c', () => {

    let testfile = testFolder + "teht17a.html"; 

    it('Tehtävä 17c: tarkistetaan table-elementti ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.navbar + .container-fluid').within(() => {            
            cy.get(".row");    

            cy.get(".col-md-8").within(() => {
                cy.get('.table').find("thead").within( () => {
                    cy.get("th").contains("Opintojakso");
                    cy.get("th").contains("Suorituspvm");
                    cy.get("th").contains("Arvosana");
                });

                cy.get(".table").find("tbody").within(() => {
                    cy.get("tr").eq(2).find("td").first().contains("Matematiikka I");
                    cy.get("tr").eq(2).find("td").eq(1).contains("28.1.2015");
                    cy.get("tr").eq(2).find("td").eq(2).contains("4/5");
                });
            });
        })
    });
});

describe('Tehtävä 17d', () => {

    let testfile = testFolder + "teht17a.html"; 

    it('Tehtävä 17d: tarkistetaan footer, 1. sarake ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.container-fluid').last().within(() => {            
            cy.get(".row");    

            cy.get('*[class*="col-md"]').eq(0).within(() => {
                cy.contains("@ 2017-2018");
            });
        })
    });

    it('Tehtävä 17d: tarkistetaan footer, 2. sarake ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.container-fluid').last().within(() => {            
            cy.get(".row");    

            cy.get('*[class*="col-md"]').eq(1).within(() => {
                cy.contains("Toimipaikat");
                cy.get("a").contains("Opistotie");
                cy.get("a").contains("Technopolis");
                cy.get("a").contains("Iisalmi");
                cy.get("a").contains("Varkaus");
            });
        })
    });

    it('Tehtävä 17d: tarkistetaan footer, 3. sarake ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.get('.container-fluid').last().within(() => {            
            cy.get(".row");    

            cy.get('*[class*="col-md"]').eq(2).within(() => {
                cy.contains("Tietoja");
                cy.get("a").contains("Yhteystiedot");
                cy.get("a").contains("GRPD");
                cy.get("a").contains("Ota yhteyttä");
            });
        })
    });
});


describe('Tehtävä 17e', () => {

    let testfile = testFolder + "teht17a.html"; 

    it('Tehtävä 17e: avataan dialog ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.contains("Tarkista").click();

        // Dialog pitäisi olla auki
        cy.wait(2000);
        cy.get('.modal').then(($el) => {expect(Cypress.dom.isHidden($el)).to.equal(false);})
    });

    it('Tehtävä 17e: avataan dialog -> tarkistetaan kentät ', () => {
        cy.viewport(1440,900);
        cy.visit(testfile);

        cy.contains("Tarkista").click();

        // Dialog pitäisi olla auki
        cy.wait(2000);

        cy.get('.modal').within( () => {
            cy.contains("Tietojen tarkistus");
            cy.contains("Tarkistatko ovatko ao. tiedot oikein");

            cy.get(".modal-footer").find("button").first().contains("Tallenna tiedot");
            cy.get(".modal-footer").find("button").last().contains("Sulje");
        });
    });

});
