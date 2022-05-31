let testFolder = './';
let testfile = testFolder + "teht26a.html"; 

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Tehtävä 26a', () => {

  it('Tehtävä 26a: oikeilla syötteillä', () => {
    cy.visit(testfile);
    cy.get("#nimi").type("Maija");
    cy.get("#osoite").type("Microkatu");

    cy.get('#reg').click();
    cy.get("#results").find("#data").contains('Maija,Microkatu');
  })

  it('Tehtävä 26a: tyhjillä syötteillä', () => {
    cy.visit(testfile);

    cy.get('#reg').click();
    //cy.get("#results").find("#data").should('have.value', '');
    cy.get("#error").contains('Nimi ja osoite väärin');
    cy.get("#osoite").should("have.css", "color", "rgb(0, 0, 0)");
    cy.get("#nimi").should("have.css", "color", "rgb(0, 0, 0)");
})

  it('Tehtävä 26a: osoite puuttuu', () => {
    cy.visit(testfile);

    cy.get("#nimi").type("Maija");
    cy.get('#reg').click();
    cy.get("#error").contains('Osoite väärin');
    cy.get("#osoite").should("have.css", "color", "rgb(0, 0, 0)");
  })

  it('Tehtävä 26a: nimi puuttuu', () => {
    cy.visit(testfile);

    cy.get("#osoite").type("Opistotie");
    cy.get('#reg').click();
    cy.get("#error").contains('Nimi väärin');
    cy.get("#nimi").should("have.css", "color", "rgb(0, 0, 0)");
  })

});

describe('Tehtävä 27a', () => {

    it('Tehtävä 27a: testataan ammatti alasvetovalikko ja checkbox -> ei valita mitään', () => {      
      cy.visit(testfile);

      cy.document().then($d => {
        // Lisätään muutama ammatti
        var s = $d.getElementById("ammatti");
        
        // Tyhjennetään select-elementin alta kaikki valinnat
        let options = s.querySelectorAll("#ammatti > option");
        for(let i=options.length-1; i >= 0; i-- )
          s.remove(i);

        var option = document.createElement("option");
        option.text = "Valitse ihmeessä joku ammatti";
        option.value = "tyhja"
        s.add(option);   

        option = document.createElement("option");
        option.text = "Poliisi";
        s.add(option);   
        option = document.createElement("option");
        option.text = "Opettaja";
        s.add(option);   
        option = document.createElement("option");
        option.text = "Siivooja";
        s.add(option);   

        cy.get('#reg_27').click();
        cy.get("#error_ammatti").contains("Valitse ammatti")

        // Valitaan checkbox:t, mutta ammattia ei ole valittu
        cy.get("#erityisruokavalio").check();
        cy.get('#reg_27').click();
        cy.get("#error_ammatti").contains("Valitse ammatti")

      });
    });


    it('Tehtävä 27a: testataan ammatti alasvetovalikko ja checkbox -> valitaan arvot', () => {      
      

      cy.get("#ammatti").select("Poliisi"); 
      cy.get('#reg_27').click();
      cy.get("#tyo").contains("Poliisi")
      cy.get("#optiot").contains("Valitsit seuraavat optiot:Erityisruokavalio")

      cy.get("#tarvitsee_majoituksen").check();
      cy.get('#reg_27').click();
      cy.get("#optiot").contains("Valitsit seuraavat optiot:Erityisruokavalio,Tarvitsee majoituksen")

    })

});  

describe("Tehtävä 28", () => {
  it('Tehtävä 28a: testataan opiskelija checkbox -> opiskelijanroa ei ole annettu', () => {      
    cy.get("#opiskelija").check();
    cy.get('#reg_27').click();

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get("#opiskelijanro").should("be.visible");
    cy.get("#optiot").should("be.empty");
  });

  it('Tehtävä 28a: testataan opiskelija checkbox -> opiskelijanroa annettu', () => {      
    cy.get("#opiskelijanro").type("1234");
    cy.get('#reg_27').click();
    cy.get("#optiot").contains("Valitsit seuraavat optiot:Erityisruokavalio,Tarvitsee majoituksen")
    cy.get("#tyo").contains("Poliisi")
    cy.get("#o_nro").contains("Opiskelijanro: 1234")
  });
})

describe('Tehtävä 29a', () => {
  let testfile = testFolder + "teht29a.html"; 
  
  it('Tehtävä 29a: testataan osoite linkki', () => {      
    cy.visit(testfile);

    cy.get("#link1").click();
    cy.get("#oikea").find("#osoite").should("be.visible");
    cy.get("#oikea").find("#osoite").contains("Savonia AMK Microkatu 1");
    cy.get("#oikea").find("#kartta").should("not.be.visible");
  });

  it('Tehtävä 29a: testataan osoite linkki', () => {      
    cy.visit(testfile);

    cy.get("#link2").click();
    cy.get("#oikea").find("#osoite").should("not.be.visible");
    cy.get("#oikea").find("#kartta").should("be.visible");
    cy.get("#oikea").find("#kartta").contains("Savonian campusalueen kartta");
  });

});

describe('Tehtävä 30a', () => {
  let testfile = testFolder + "teht29a.html"; 
  
  it('Tehtävä 30a: testataan osoite linkki', () => {      
    cy.visit(testfile);

    cy.get("#link3").click();
    cy.get("#kuva1").should("be.visible");
    cy.get("#kuva2").should("be.visible");
    
    
    cy.document().then($d => {
      let srcOriginal = $d.getElementById("kuva1").getAttribute("src");
      cy.get("#kuva1").trigger("mouseover");
      let srcChanged = $d.getElementById("kuva1").getAttribute("src");
      cy.get("#kuva1").should("not.have.attr", srcOriginal);
    });
  });

});