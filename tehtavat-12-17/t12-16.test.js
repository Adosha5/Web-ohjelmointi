// Aja testi komentorivillä ao. komennolla (siinä hakemistossa missä on t1-11.test.js tiedosto)
// npx cypress run -r ./CypressReporter.js -s ./t12-16.test.js -q

let testFolder = "./";

describe('Tehtävä 12', () => {

    let testfile = testFolder + "teht12.html"; 

    it('Tehtävä 12: tarkistetaan onko tekstit grid:n sisällä', () => {
        cy.visit(testfile);
        let gridFound = false;
        cy.contains("Welcome to Savonia").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == "grid") gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })

        gridFound = false;
        cy.contains("Mainosasiaa").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == "grid") gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })

        gridFound = false;
        cy.contains("Contact information").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == "grid") gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })
    })

    it('Tehtävä 12: tarkistetaan onko header ja footer tekstit keskitetty', () => {
        cy.visit(testfile);
        cy.contains("Welcome to Savonia").should("have.css", "text-align", "center")
        cy.contains("Contact information").should("have.css", "text-align", "center")
    });


    it('Tehtävä 12: tarkistetaan linkit -> ei lista-pallukkaa', () => {
        cy.visit(testfile);
        cy.get("li").parent().should("have.css", "list-style-type", "none")
    });

    it('Tehtävä 12: tarkistetaan että sivu on irti selainikkunan reunasta', () => {
        cy.visit(testfile);
        cy.get("body").should("have.css", "margin-left");
        cy.get("body").should("have.css", "margin-right");
    });

    it('Tehtävä 12: tarkistetaan linkit -> ul-elementti', () => {
        cy.visit(testfile);
        let gridFound = false;

        //cy.contains("Lista linkeistä").parents().each(($el) => {
        cy.get("ul").parents().each(($el) => {    
                var d = $el.css("display");
            if ( d == "grid") gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })
    });
});

describe('Tehtävä 13', () => {

    let testfile = testFolder + "teht13.html"; 
    let display = "flex";

    it('Tehtävä 13: tarkistetaan onko tekstit flex:n sisällä', () => {
        cy.visit(testfile);
        let gridFound = false;
        cy.contains("Welcome to Savonia").parents().each(($el) => {
            var d = $el.css("display");
            console.log(d)
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })

        gridFound = false;
        cy.contains("Mainosasiaa").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })

        gridFound = false;
        cy.contains("Contact information").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })
    })

    it('Tehtävä 13: tarkistetaan onko header ja footer tekstit keskitetty', () => {
        cy.visit(testfile);
        cy.contains("Welcome to Savonia").should("have.css", "text-align", "center")
        cy.contains("Contact information").should("have.css", "text-align", "center")
    });


    it('Tehtävä 13: tarkistetaan linkit -> ei lista-pallukkaa', () => {
        cy.visit(testfile);
        cy.get("li").parent().should("have.css", "list-style-type", "none")
    });

    it('Tehtävä 13: tarkistetaan että sivu on irti selainikkunan reunasta', () => {
        cy.visit(testfile);
        cy.get("body").should("have.css", "margin-left");
        cy.get("body").should("have.css", "margin-right");
    });

    it('Tehtävä 13: tarkistetaan linkit -> ul-elementti', () => {
        cy.visit(testfile);
        let gridFound = false;

        //cy.contains("Lista linkeistä").parents().each(($el) => {
        cy.get("ul").parents().each(($el) => {    
                var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })
    });
});

describe('Tehtävä 14', () => {

    let testfile = testFolder + "teht14.html"; 

    let gridFound = false;
    let display = "flex";

    it('Tehtävä 14: tarkistetaan että flex on käytössä', () => {
        cy.visit(testfile);

        cy.get("a").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    
    });

    it('Tehtävä 14: tarkistetaan Savonia linkki ilman alleviivausta ', () => {
        cy.visit(testfile);
        cy.get("a").contains("Savonia").should("have.css", "text-decoration-line", "none")   
    });

    it('Tehtävä 14: tarkistetaan alasvetovalikko', () => {
        cy.visit(testfile);
        cy.get("select").find("option").contains("Valitse")
    });

    it('Tehtävä 14: tarkistetaan oikean laidan input-kentät', () => {
        cy.visit(testfile);
        cy.get("input[type='text']");
        cy.get("input[type='text']").should("have.attr", "placeholder", "Search");
        cy.get("input[type='submit']");
        cy.get("input[type='submit']").should("have.attr", "value", "Search");

        // Tässä oletetaan että input-elementit ovat div:n sisällä  -> auto-value ei toimi!!!
        //cy.get("input[type='text']").parent().should("have.css", "margin-left", "auto")
    });
});

describe('Tehtävä 15', () => {

    let testfile = testFolder + "teht15.html"; 

    let gridFound = false;
    let display = "grid";

    it('Tehtävä 15: tarkistetaan että grid on käytössä', () => {
        cy.visit(testfile);

        cy.contains("Henkilöstö").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.contains("Korkeakoulu").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.contains("Google").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.contains("Banaani").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.contains("rokkaa").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

    });

    it('Tehtävä 15: tarkistetaan että grid on 5x5', () => {        

        cy.window().then(w => { 
            let grid = w.document.querySelector("#grid");
            const colCount = w.getComputedStyle(grid).gridTemplateColumns.split(" ").length;
            expect(colCount).to.equal(5);
        });

        cy.window().then(w => {
            let grid = w.document.querySelector("#grid");
            const rowCount=  w.getComputedStyle(grid).gridTemplateRows.split(" ").length;  
            expect(rowCount).to.equal(5);
        }); 
    })

    it('Tehtävä 15: tarkistetaan solut 1/3', () => {
        cy.visit(testfile);

        cy.get("a").contains("Google").should('have.attr', "href", "https://www.google.com/");
        cy.get("a").contains("UEF").should('have.attr', "href", "https://www.uef.fi/");
        cy.get("a").contains("Savon sanomat").should('have.attr', "href", "https://www.savonsanomat.fi/");
    });


    it('Tehtävä 15: tarkistetaan solut 2/3', () => {
        cy.visit(testfile);

        cy.get("ol").first().find("li").first().should('contain', "Yksi");
        cy.get("ol").eq(1).find("li").eq(2).should('contain', "Persikka");
        cy.get("ol").eq(2).find("li").eq(2).should('contain', "Toyota");
    });

    it('Tehtävä 15: tarkistetaan solut 3/3', () => {
        cy.visit(testfile);

        cy.contains("Javascript").should("have.css", "font-size", "30px", "font-style", "italic");
        cy.contains("rokkaa").should("have.css", "font-size", "30px", "font-style", "italic");
        cy.contains("selaimessa").should("have.css", "font-size", "30px", "font-style", "italic");

    });

}); 

describe('Tehtävä 16', () => {

    let testfile = testFolder + "teht16.html"; 

    let gridFound = false;
    let display = "grid";

    it('Tehtävä 16: tarkistetaan että grid on käytössä', () => {
        cy.visit(testfile);

        cy.get("input[type='text']").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.get("select").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.get("input[type='checkbox']").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.get("input[type='radio']").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

        cy.get("button").parents().each(($el) => {
            var d = $el.css("display");
            if ( d == display) gridFound = true;           
        }).then(($el) => {
            expect(gridFound).to.equal(true);
        })    

    });

    it('Tehtävä 16: tarkistetaan button:t', () => {
        cy.visit(testfile);

        cy.get("button").contains("Tyhjennä");
        cy.get("button").contains("Lähetä");
    });

    it('Tehtävä 16: tarkistetaan label:t', () => {
        cy.visit(testfile);

        cy.contains("Nimi").should("have.css", "text-align", "right");
        cy.contains("Vuosikurssi").should("have.css", "text-align", "right");
        cy.contains("Oppilaitos").should("have.css", "text-align", "right");
        cy.contains("Kurssin nimi").should("have.css", "text-align", "right");
        cy.contains("Kurssin toteutus").should("have.css", "text-align", "right");
        cy.contains("Sukupuoli").should("have.css", "text-align", "right");
        cy.contains("Harrastukset").should("have.css", "text-align", "right");
    });

    it('Tehtävä 16: tarkistetaan radio button:t', () => {
        cy.visit(testfile);

        cy.contains("mies").should("have.css", "text-align", "right");
        cy.contains("nainen").should("have.css", "text-align", "right");
        cy.contains("en kommentoi").should("have.css", "text-align", "right");
    })

    it('Tehtävä 16: tarkistetaan check box:t', () => {
        cy.visit(testfile);

        cy.contains("ATK-pelit").should("have.css", "text-align", "right");
        cy.contains("Tietokonepelit").should("have.css", "text-align", "right");
        cy.contains("PC-pelit").should("have.css", "text-align", "right");
        cy.contains("Videopelit").should("have.css", "text-align", "right");
    })

}); 


function getGridElementsPosition(index) {
    const gridEl = document.getElementById("grid");
  
    // our indexes are zero-based but gridColumns are 1-based, so subtract 1
    let offset = Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) - 1; 
  
    // if we haven't specified the first child's grid column, then there is no offset
    if (isNaN(offset)) {
      offset = 0;
    }
    const colCount = window.getComputedStyle(gridEl).gridTemplateColumns.split(" ").length;
  
    const rowPosition = Math.floor((index + offset) / colCount);
    const colPosition = (index + offset) % colCount;
  
    //Return an object with properties row and column
    return { row: rowPosition, column: colPosition };
}
  
function getNodeIndex(elm) {
    var c = elm.parentNode.children,
        i = 0;
    for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems() {
    let gridItems = document.getElementsByClassName("grid");
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].onclick = (e) => {
        let position = getGridElementsPosition(getNodeIndex(e.target));
        console.log(`Node position is row ${position.row}, column ${position.column}`);
        };
    }
}
