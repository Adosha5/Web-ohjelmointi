// npx cypress run -r ./CypressReporter.js -s ./teht31_37.test.js -q

let testFolder = './';
let testfile = testFolder + "teht31_37.html"; 

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Tehtävä 31', () => {

    it('Tehtävä 31: oikeilla syötteillä', () => {
      cy.visit(testfile);
      cy.get("#etunimi").type("Maija");
      cy.get("#osoite").type("Microkatu");
  
      cy.get('#tallenna').click();
      cy.get("#tulos").contains('Maija,Microkatu');
    })
  
    it('Tehtävä 31: tyhjillä syötteillä', () => {
      cy.visit(testfile);
  
      cy.get('#tallenna').click();
      cy.get("#virhe").contains('Pakollisia tietoja puuttuu: Etunimi on liian lyhyt. Osoite on liian lyhyt.');
  })
  
    it('Tehtävä 31: nimi liian lyhyt', () => {
      cy.visit(testfile);
  
      cy.get("#etunimi").type("Ma");
      cy.get("#osoite").type("Microkatu");
      cy.get('#tallenna').click();
      cy.get("#virhe").contains('Pakollisia tietoja puuttuu: Etunimi on liian lyhyt.');
    })
  
    it('Tehtävä 31: osoite liian lyhyt', () => {
        cy.visit(testfile);
    
        cy.get("#etunimi").type("Maija");
        cy.get("#osoite").type("Mi");
        cy.get('#tallenna').click();
        cy.get("#virhe").contains('Pakollisia tietoja puuttuu: Osoite on liian lyhyt.');
      })
    
  });

describe('Tehtävä 31a', () => {
    it('Tehtävä 31a: tyhjillä syötteillä, virhe näkyvissä 3s', () => {
        cy.visit(testfile);
    
        cy.get('#lisaa').click();
        cy.get("#error").contains('Pakollisia tietoja puuttuu: Etunimi on liian lyhyt. Osoite on liian lyhyt.');
        cy.get("#error").should("be.visible");

        // Odotetaan 3s        
        cy.wait(4000);
        cy.get("#virhe").should("not.be.visible");
    })

    it('Tehtävä 31a: tyhjillä syötteillä, tietoja ei saa lisätä alasvetovalikkoon', () => {
        cy.visit(testfile);
    
        cy.get('#lisaa').click();
        cy.get('#results').find("options").should('have.length', 0)
    })

    it('Tehtävä 31a: oikeilla syötteillä, tiedot lisätään alasvetovalikkoon', () => {
        cy.visit(testfile);
    
        cy.get("#etunimi").type("Maija");
        cy.get("#osoite").type("Microkatu");
        cy.get('#lisaa').click();
        cy.get('#results').find("option").should('have.length', 1)
    })

    it('Tehtävä 31a: oikeilla syötteillä, toinen syöte, tiedot lisätään alasvetovalikkoon', () => {
        cy.get("#etunimi").type("Liisa");
        cy.get("#osoite").type("Opistotie 2");
        cy.get('#lisaa').click();
        cy.get('#results').find("option").should('have.length', 2)
    })

});

describe('Tehtävä 32', () => {

    it('Tehtävä 32: Tarkistetaan että valittu pvm-kentässä on oikea arvo', () => {
      cy.visit(testfile);
      cy.get("#pvm_result").contains('Pvm:ää ei ole valittu');
      cy.get("#pvm_result").should("have.css", "color", "rgb(255, 0, 0)")      
    })

    it('Tehtävä 32: Valitaan pvm sallitulta väliltä', () => {
        cy.visit(testfile);
        let pvm = "13.10.2020";
        cy.get("#pvm").type(pvm);
        cy.get("#pvm").click();
        cy.wait(500);
        //cy.get("[data-month='9']").click();
        cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click();

        cy.get("#pvm_result").contains(pvm);
      })

      it('Tehtävä 32: Valitaan pvm joka on sallitun pvm:n jälkeen', () => {
        cy.visit(testfile);
        let pvm = "13.10.2021";
        cy.get("#pvm").type(pvm);
        cy.get("#pvm").click();
        cy.wait(500);
        //cy.get("[data-month='9']").click();
        cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click();

        cy.get("#pvm_result").contains("31.12.2020");
      })


      it('Tehtävä 32: Testataan suomalainen formaatti', () => {
        cy.visit(testfile);

        // Klikataan komponenttia -> avautuu automatic joulukuulle 2020
        cy.get("#pvm").click();
        cy.wait(500);
        cy.get('.ui-datepicker-title').contains("Joulukuu")        
      })

});


describe('Tehtävä 33: Autocomplete komponentti', () => {

	beforeEach(() => {
		cy.intercept('http://codez.savonia.fi/jussi/api/json_data.php?term*').as("haeKaupunki");
	});

    it('Tehtävä 33: Autocomplete komponentti', () => {
        cy.visit(testfile);
        cy.get("#autoc").click();
        cy.get("#autoc").type("Kuo");
        cy.wait("@haeKaupunki");
        cy.get("#autoc").type('{downarrow}');
        cy.contains("Kuopio")
    });
});

describe('Tehtävä 34: jQuery dialog', () => {

  let nimi = "Maija";
  let tunnus = "s1234";
  it('Tehtävä 34: jQuery dialog, p-elementti piilossa, data oikein', () => {
      cy.visit(testfile);

      cy.get("#d_content").should("not.be.visible");
      cy.get("#d_content").contains("Tämä oli alunperin piilossa");
      // Avataan dialogi
      cy.get("#rekisteroidy").click();
      
      // Onko otsikko oikein?
      cy.get("div").contains("Rekister");
      cy.get("#d_nimi").type(nimi);
      cy.get("#d_tunnus").type(tunnus);

      cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
      cy.get("#d_results").contains(nimi + ", " + tunnus);
      cy.get("#d_content").should("be.visible");
  });

  it('Tehtävä 34: jQuery dialog, data väärin', () => {
    cy.visit(testfile);

    // Avataan dialogi
    cy.get("#rekisteroidy").click();
    
    // Onko otsikko oikein?
    cy.get("#d_nimi").type("X");
    cy.get("#d_tunnus").type(tunnus);

    cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
    cy.get("#d_error").contains("Data väärin");
    cy.get("#d_content").should("not.be.visible");
    // Onko dialogi auki?
    cy.get("div").contains("Rekister");

    cy.get("#d_nimi").clear();
    cy.get("#d_nimi").type(nimi);
    cy.get("#d_tunnus").clear();
    cy.get("#d_tunnus").type("X");

    cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
    cy.get("#d_error").contains("Data väärin");
    cy.get("#d_content").should("not.be.visible");
    // Onko dialogi auki?
    cy.get("div").contains("Rekister");

  });
});

describe('Tehtävä 35: REST apin kutsuminen', () => {

	beforeEach(() => {
		cy.intercept('http://localhost:3000/tuotetyyppi').as("haeTuotetyyppi");
		cy.intercept('http://localhost:3000/tuote').as("haeTuote");
	});

  it('Tehtävä 35: Haetaan tuotetyypit', () => {
      cy.visit(testfile);

      cy.get("#hae_tyypit").click();
	  //cy.wait("@haeTuotetyyppi");
	  cy.wait(2000);

      // Löytyykö 10 tuotetyyppiä
      //cy.get("#tuotetyypit").find("option").its('length').should('be.gt', 10)
	  cy.get("#tuotetyypit option").its('length').should('be.gte', 10)
  });

  it('Tehtävä 35: Haetaan tuotteet', () => {
    cy.visit(testfile);

    cy.get("#hae_data").click();
    cy.wait("@haeTuote");
    
	// Löytyykö  vähintään 20 tuotetta
    //cy.get("#tuotteet").find("tr").its('length').should('be.gt', 10)
	cy.get("#tuotteet tr").its('length').should('be.gte', 10)
  });
});

describe('Tehtävä 36: Tuotteiden haku hakuehtojen mukaan', () => {

	beforeEach(() => {
		cy.intercept('http://localhost:3000/tuotetyyppi').as("haeTuotetyyppi");
		cy.intercept('http://localhost:3000/tuote?*nimi*').as("haeTuoteByNimi");
		cy.intercept('http://localhost:3000/tuote?*valmistaja*').as("haeTuoteByValmistaja");
		cy.intercept('http://localhost:3000/tuote?*tyyppi_id*').as("haeTuoteByTyyppi");
		cy.intercept('http://localhost:3000/tuote?*').as("haeTuoteByAll");
	});

  it('Tehtävä 36: Haetaan tuotteet nimen mukaan', () => {
    cy.visit(testfile);
    cy.wait("@haeTuotetyyppi");

    cy.get("#nimi_he").type("Banaani");
    cy.get("#hae").click();
    cy.wait("@haeTuoteByNimi");
    
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
	cy.get("#tuotteet tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
  });

  it('Tehtävä 36: Haetaan tuotteet valmistajan mukaan', () => {
    cy.visit(testfile);
    cy.wait("@haeTuotetyyppi");

    cy.get("#valmistaja_he").type("Chiquita");
    cy.get("#hae").click();
    cy.wait("@haeTuoteByValmistaja");
    
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
	cy.get("#tuotteet tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
  });

  it('Tehtävä 36: Haetaan tuotteet tuotetyypin mukaan', () => {
    cy.visit(testfile);
    cy.wait("@haeTuotetyyppi");

    // Hedelmät
    cy.get("#tuotetyypit_he").select("3");
    cy.get("#hae").click();
	  cy.wait("@haeTuoteByTyyppi");
	
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 3) // Varsinainen data + otsikot
	  cy.get("#tuotteet tr").its('length').should('be.eq', 3) // Varsinainen data + otsikot
  });

  it('Tehtävä 36: Haetaan tuotteet nimen, valmistajan ja tuotetyypin mukaan', () => {
    cy.visit(testfile);
    cy.wait("@haeTuotetyyppi");

    cy.get("#tuotetyypit_he").select("3");
    cy.get("#valmistaja_he").type("Chiquita");
    cy.get("#nimi_he").type("Banaani");
    cy.get("#hae").click();
	cy.wait("@haeTuoteByAll");
    
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
	cy.get("#tuotteet tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
  });

});

describe('Tehtävä 37: Tuotteen poisto',  () => {
	beforeEach(() => {
		cy.intercept('http://localhost:3000/tuotetyyppi').as("haeTuotetyyppi");
		cy.intercept('DELETE', 'http://localhost:3000/tuote/*').as("poistaTuote");
		cy.intercept('GET', 'http://localhost:3000/tuote?nimi=*').as("haeTuote");
	});

  it('Tehtävä 37: Haetaan poistettava tuote ja poistetaan se', () => {

    cy.visit(testfile);
    cy.wait("@haeTuotetyyppi");

    //cy.get("#tuotetyypit").select("3");
	// HUOM! Testi feilaa, jos aiemmin ei ole tehty tyypin automaattista hakua, haetaan siis aina nimellä
	// jolla löytyy vain yksi rivi, joka poistetaan
	  cy.get("#nimi_he").type("Tomaattimurska");	
    cy.get("#hae").click();
    cy.wait("@haeTuote");
	
    cy.get("#tuotteet tr").its('length').then(($r) =>
    {
      cy.log("rows:", $r);
      cy.get("#poista_14").click();
	  cy.wait("@poistaTuote");
	  cy.wait("@haeTuote");
  
      //cy.get("#tuotteet").find("tr").its('length').should('be.lt', parseInt($r));
	  cy.get("#tuotteet tr").its('length').should('be.lt', parseInt($r));
  
    })
  });

});
