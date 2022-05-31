// npx cypress run -r ./CypressReporter.js -s ./teht38_44.test.js -q

let testFolder = './';

let testinimi = "";
let testiosoite = "Testaajanpolku 2";
let testipostinro = "71802";
let testipostitmp = "Testikaupunki";
let testiasty_avain = 5;

let testinimi_poisto = "ALA VAAN POISTA__" + "1612591877105"; //Date.now();
let testiosoite_poisto = "OSOITE BY JK, ÄLÄ POISTA__" + "1612591877105"; //Date.now()
let testipostitmp_poisto = "POSTITMP BY JK, ÄLÄ POISTA__" + "1612591877105" // Date.now() // ALA VAAN POISTA__1612591877105

function uuid4() {
    const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
    const view = new DataView(new ArrayBuffer(16)); /// Create a view backed by a 16-byte buffer
    crypto.getRandomValues(new Uint8Array(view.buffer)); /// Fill the buffer with random data
    view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40); /// Patch the 6th byte to reflect a version 4 UUID
    view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80); /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
}

var guid = uuid4();

before(() => {

    let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid;
	cy.request(url);

    // Lisätään testidataa ...	
    url = "https://codez.savonia.fi/jussi/api/asiakas/generate_test.php?guid=" + guid;
	cy.request(url).then((response) => {
		console.log(response);
		testinimi = response.body.new_name;
	});
})

after(() => {
    // Poistetaan testidata ...	
    let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid;
	cy.request(url);
})


// Tehtävä 38
describe('Tehtävä 38: Asiakkaan haku', () => {

    it('Tehtävä 38: haetaan ilman hakuehtoja', () => {
		cy.visit(testFolder + "teht38_44.html");

        cy.get("#haeNappi").click();

        // Pitäisi löytyä ainakin testiaineisto
        cy.get("table").find("tbody").find("tr").find("td").contains(testinimi);   // Nimi
		cy.get("table").find("tbody").find("tr").last().find("td").contains(testiosoite);   // osoite
        cy.get("table").find("tbody").find("tr").last().find("td").contains(testipostinro);   // postinro
        cy.get("table").find("tbody").find("tr").last().find("td").contains(testipostitmp);   // postitmp
        cy.get("table").find("tbody").find("tr").last().find("td").contains(testiasty_avain);   // asiakastyyppi avain
    });

    it('Tehtävä 38: haetaan nimellä', () => {
        // Haetaan nimellä
        cy.get("#nimi").type(testinimi);
        cy.get("#haeNappi").click();

        cy.get("table").find("tbody").find("tr").last().find("td").eq(0).contains(testinimi);   // Nimi
        cy.get("table").find("tbody").find("tr").last().find("td").eq(1).contains(testiosoite);   // Osoite        
    });
	
	it('Tehtävä 38: haetaan nimellä ja osoitteella', () => {
        // Haetaan nimellä ja osoitteella
        cy.get("#osoite").type(testiosoite);
        cy.get("#haeNappi").click();

        cy.get("table").find("tbody").find("tr").last().find("td").eq(0).contains(testinimi);   // Nimi
        cy.get("table").find("tbody").find("tr").last().find("td").eq(1).contains(testiosoite);   // Osoite        
    });

});

describe('Tehtävä 39: Asiakkaan haku hakuehdoilla', () => {

    it('Tehtävä 39: haetaan asiakastyypillä, nimellä ja osoitteella', () => {
        cy.visit(testFolder + "teht38_44.html");

		// Haetaan nimellä ja osoitteella ja tyypillä
        cy.get("#nimi").clear();
        cy.get("#osoite").clear();
        cy.get("#nimi").type(testinimi);
        cy.get("#osoite").type(testiosoite);
        cy.get("#asty").select(testiasty_avain + "");
        cy.get("#haeNappi").click();

        cy.get("table").find("tbody").find("tr").find("td").eq(0).contains(testinimi);   // Nimi
        cy.get("table").find("tbody").find("tr").find("td").eq(1).contains(testiosoite);   
        cy.get("table").find("tbody").find("tr").find("td").eq(2).contains(testipostinro);   
        cy.get("table").find("tbody").find("tr").find("td").eq(3).contains(testipostitmp);   
        cy.get("table").find("tbody").find("tr").find("td").eq(5).contains(testiasty_avain); 
    });

});

describe('Tehtävä 40: Asiakkaan poisto', () => {

    it('Tehtävä 40: Asiakkaan poisto', () => {
        cy.visit(testFolder + "teht38_44.html");

		// Haetaan nimellä ja osoitteella ja tyypillä poistettava asiakas -> pitäisi löytyä ainakin yksi
        cy.get("#nimi").clear();
        cy.get("#osoite").clear();
        cy.get("#nimi").type(testinimi);
        cy.get("#osoite").type(testiosoite);
        cy.get("#asty").select(testiasty_avain + "");
        cy.get("#haeNappi").click();

        // Painetaan poista nappia testidata riville
		cy.get("table").find("tbody").find("tr").contains(testinimi).parent('tr').within(($row) => {

			cy.get("button").contains("Poista").click();
			cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/poista.php')
		})
    });
	
	it('Tehtävä 40: Asiakkaan poisto, haetaan data uudelleen', () => {
		// Haetaan nimellä ja osoitteella ja tyypillä poistettava asiakas -> ei pitäisi löytyä enää
        cy.get("#nimi").clear();
        cy.get("#osoite").clear();
        cy.get("#nimi").type(testinimi);
        cy.get("#osoite").type(testiosoite);
        cy.get("#asty").select(testiasty_avain + "");
        cy.get("#haeNappi").click();

        cy.get("table").find(testinimi).should("not.exist");   // Nimi
    });

});

describe('Tehtävä 41: Asiakkaan poisto, asiakas häviää taulukosta automaattisesti', () => {

    it('Tehtävä 41: Asiakkaan poisto, asiakas häviää taulukosta automaattisesti', () => {
        // cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php')

        // Nyt ei pitäisi löytyä enää mitään
        // cy.get("table").find("tbody").find('tr').should('have.length', 0)
		
		cy.visit(testFolder + "teht38_44.html");

		// Jos aiempia tehtäviä ei ole tehty oikein/ollenkaan, poistetaan aiempi testiaineisto varmuuden vuoksi
		let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid;
		cy.request(url);

		cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/clear_test.php');

		// Lisätään testidataa uudelleen, koska aiempi on ehkä jo poistunut ...	
		url = "https://codez.savonia.fi/jussi/api/asiakas/generate_test.php?guid=" + guid;
		cy.request(url).then((response) => {
			//console.log(response);
			testinimi = response.body.new_name;
			
			// Haetaan nimellä ja osoitteella ja tyypillä poistettava asiakas -> pitäisi löytyä ainakin yksi
			cy.get("#nimi").clear();
			cy.get("#osoite").clear();
			cy.get("#nimi").type(testinimi);
			cy.get("#osoite").type(testiosoite);
			cy.get("#asty").select(testiasty_avain + "");
			cy.get("#haeNappi").click();
			cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php');

			// Painetaan poista nappia testidata riville
			cy.get("table").find("tbody").find("tr").contains(testinimi).parent('tr').within(($row) => {

				cy.get("button").contains("Poista").click();				
			});
			
			cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/poista.php');
				
			cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php');

			// Nimeä EI saa löytyä enää taulukosta
			cy.get("table").find(testinimi).should("not.exist");   // Nimi
		});		
    });
});


let guid_lisays = "";

describe('Tehtävä 42: Asiakkaan lisääminen', () => {

	before( () => {
		guid_lisays = uuid4();
	});

    it('Tehtävä 42: Asiakkaan lisääminen', () => {

		cy.visit(testFolder + "teht38_44.html");

		//cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', (req) => {
		
		// Lisätään kutsuun tunniste, jonka perusteella voidaan poistaa juuri lisätty asiakas testin jälkeen
		cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', (req) => {
			
			req.body = req.body + "&guid=" + guid_lisays;
			//console.log("intercept", req.body);
			req.continue();
		});

		// // Tarkistetaan että lisäys meni läpi
		// cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', {
			// statusCode : 200
		// });

        // Avataan dialogi
        cy.get("#lisaa_asiakas").click();

        // Täytetään dialogin kentät
        let n = "TEST CUSTOMER " + Date.now();
        let o = "TEST ADDRESS " + Date.now();
        let pn = "SCA_2";
        let pt = "TEST POSTAL " + Date.now();
        let at = "2";

        cy.get("#nimi_lisays").type(n);
        cy.get("#osoite_lisays").type(o);
        cy.get("#postinro_lisays").type(pn);
        cy.get("#postitmp_lisays").type(pt);        

		cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/lisaa.php').as("lisaaAsiakas");
		
        // Syötetään asiakastyyppin id input kenttään, jos se löytyy (tehtävä 42), 
        cy.get("#asty_avain_lisays").type(at);
		// Painetaan Tallenna-nappia
		cy.get("button").contains("Tallenna").click();
		// Tarkistetaan että lisäys meni läpi
		
		cy.wait("@lisaaAsiakas").its('response.statusCode').should('eq', 200);

/*		
		cy.get("input[id='asty_avain_lisays']").then(($input) => {
            console.log("inputti:", $input);
			//cy.get("#asty_avain_lisays").type(at);
			$input.type(at);
            
            // Painetaan Tallenna-nappia
            cy.get("button").contains("Tallenna").click();

            // Tarkistetaan että lisäys meni läpi
            // cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', {
                // statusCode : 200
            // });
        });
*/
    });
	
	after(() => {
		// Poistetaan testidata ...	
		let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid_lisays;
		//cy.request(url);
	})
});

describe('Tehtävä 43: Asiakkaan lisääminen, asiakastyyppi alasvetovalikosta', () => {

	before( () => {
		guid_lisays = uuid4();
	});

    it('Tehtävä 43: Asiakkaan lisääminen, asiakastyyppi alasvetovalikosta', () => {

		cy.visit(testFolder + "teht38_44.html");

		// Lisätään kutsuun tunniste, jonka perusteella voidaan poistaa juuri lisätty asiakas testin jälkeen
		cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', (req) => {			
			req.body = req.body + "&guid=" + guid_lisays;
			req.continue();
		});
        
        // Avataan dialogi
        cy.get("#lisaa_asiakas").click();

        // Täytetään dialogin kentät
        let n = "TEST CUSTOMER " + Date.now();
        let o = "TEST ADDRESS " + Date.now();
        let pn = "SCA_2";
        let pt = "TEST POSTAL " + Date.now();
        let at = "2";

        cy.get("#nimi_lisays").type(n);
        cy.get("#osoite_lisays").type(o);
        cy.get("#postinro_lisays").type(pn);
        cy.get("#postitmp_lisays").type(pt);

		cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/lisaa.php').as("lisaaAsiakas");
		
		cy.get("select[id='asty_lisays']").select(at);

		// Painetaan Tallenna-nappia
		cy.get("button").contains("Tallenna").click();

		// Tarkistetaan että lisäys meni läpi
		cy.wait("@lisaaAsiakas").its('response.statusCode').should('eq', 200);

/*        
        cy.get("select[id='asty_avain_lisays']").then(($input) => {
            
            $input.select(at);
            
            // Painetaan Tallenna-nappia
            cy.get("button").contains("Tallenna").click();

            // Tarkistetaan että lisäys meni läpi
			cy.wait("@lisaaAsiakas").its('response.statusCode').should('eq', 200);
        });
*/
    });
	
	after(() => {
		// Poistetaan testidata ...	
		let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid_lisays;
		//cy.request(url);
	})

});

// Lisäystä ja muutosta varten kenttien arvoja
let n = "TEST CUSTOMER " + Date.now();
let o = "TEST ADDRESS " + Date.now();
let pn = "SCA_2";
let pt = "TEST POSTAL " + Date.now();
let at = "2";

describe('Tehtävä 44: Asiakkaan lisääminen, lisätty asiakas näkyy taulukossa', () => {

	before( () => {
		guid_lisays = uuid4();
	});

    it('Tehtävä 44: Asiakkaan lisääminen, lisätty asiakas näkyy taulukossa', () => {

		cy.visit(testFolder + "teht38_44.html");

		// Lisätään kutsuun tunniste, jonka perusteella voidaan poistaa juuri lisätty asiakas testin jälkeen
		cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', (req) => {
			
			req.body = req.body + "&guid=" + guid_lisays;
			//console.log("intercept", req.body);
			req.continue();
		});
			
        // Avataan dialogi
        cy.get("#lisaa_asiakas").click();

        // Täytetään dialogin kentät

        cy.get("#nimi_lisays").type(n);
        cy.get("#osoite_lisays").type(o);
        cy.get("#postinro_lisays").type(pn);
        cy.get("#postitmp_lisays").type(pt);

		cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/lisaa.php').as("lisaaAsiakas");
		cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php?').as("haeAsiakas");
		
		cy.get("select[id='asty_lisays']").select(at);

		// Painetaan Tallenna-nappia
		cy.get("button").contains("Tallenna").click();

		// Tarkistetaan että lisäys meni läpi
		cy.wait("@lisaaAsiakas").its('response.statusCode').should('eq', 200);

		cy.wait("@haeAsiakas");

		// Nyt pitäisi löytyä juuri lisätty asiakas taulukosta viimeisenä
		cy.get("table").find("tbody").find("tr").find("td").contains(n).parent().find("td").eq(0).contains(n);   // Nimi

/*        
        cy.get("select[id='asty_avain_lisays']").then(($input) => {
            
            $input.select(at);
            
            // Painetaan Tallenna-nappia
            cy.get("button").contains("Tallenna").click();

            // Tarkistetaan että lisäys meni läpi
            cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', {
                statusCode : 200
            });

            // Odotetaan että haku meni läpi
            cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php');

            // Nyt pitäisi löytyä juuri lisätty asiakas taulukosta viimeisenä
            cy.get("table").find("tbody").find("tr").last().find("td").eq(0).contains(n);   // Nimi
        });
*/
    });
	
	after(() => {
		// Poistetaan testidata ...	
		let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid_lisays;
		//cy.request(url);
	})

});

var guid_muutos = "";
describe('Tehtävä 45: Asiakkaan muutos', () => {

	before( () => {
		guid_muutos = uuid4();
		console.log("MUUTOS guid:",guid_muutos);
		cy.intercept('/jussi/api/asiakas/lisaa.php').as("lisaaAsiakas");
		cy.intercept('/jussi/api/asiakas/haku.php*').as("haeAsiakas");	
		cy.intercept('/jussi/api/asiakas/muuta.php').as("muutaAsiakas");		
	});

    it('Tehtävä 45: Asiakkaan muutos', () => {

		cy.visit(testFolder + "teht38_44.html");

		//cy.intercept('https://codez.savonia.fi/jussi/api/asiakas/haku.php', { fixture: 'haku_asiakas.json' }).as("haeAsiakas")
		//cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')

		// Lisätään kutsuun tunniste, jonka perusteella voidaan poistaa juuri lisätty asiakas testin jälkeen
/*		
		cy.intercept('POST', 'https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', (req) => {
			
			req.body = req.body + "&guid=" + guid_lisays;
			//console.log("intercept", req.body);
			req.continue();
		}).as("testA");
*/
		// Lisätään ensin muokattava asiakas
		var endfix = Date.now();
		var f = new FormData();
		f.append("nimi", "TC nimi UPDATE " + endfix);
		f.append("osoite", "TC osoite UPDATE " + endfix);
		f.append("postinro", "71800");
		f.append("postitmp", "TC postitmp UPDATE " + endfix);
		f.append("asty_avain", 2);
		f.append("guid", guid_muutos);
		
		
        cy.request('POST','https://codez.savonia.fi/jussi/api/asiakas/lisaa.php', f);
		//cy.wait('@lisaaAsiakas');
		cy.wait(2000);

        // Haetaan nimellä muutettava asiakas -> pitäisi löytyä vain yksi
        cy.get("#nimi").clear();
        cy.get("#osoite").clear();
        
		cy.get("#nimi").type(f.get("nimi"));
        //cy.get("#osoite").type(f.get("osoite"));
        //cy.get("#asty_avain").select(f.get("asty_avain"));
        cy.get("#haeNappi").click();

		cy.wait('@haeAsiakas');
		//cy.wait(3000);

        // Painetaan muuta nappia
        cy.get("button").contains("Muuta").click();

        // Odotetaan että muutettavan asiakkaan haku on valmis
        cy.wait("@haeAsiakas");
        
        // Täytetään dialogin kentät
        //cy.get("#nimi_lisays").clear();
        cy.get("#osoite_lisays").clear();
		cy.get("#postinro_lisays").clear();
		cy.get("#postitmp_lisays").clear();

        var n = f.get("nimi");
        var o = f.get("osoite")  + " CHANGE";
        var pt = f.get("postitmp") + " CHANGE";
		var pn = "71801";
        var at = "1";
		
		// Ei muuteta nimeä, koska sitten sillä ei löydy muutettua tietoa
        //cy.get("#nimi_lisays").type(n);
        cy.get("#osoite_lisays").type(o);
        cy.get("#postinro_lisays").type(pn);
        cy.get("#postitmp_lisays").type(pt);    
        cy.get("select[id='asty_lisays']").select(at);
            
        // Painetaan Tallenna-nappia
        cy.get("button").contains("Tallenna").click();

		// Tarkistetaan että muutos meni läpi
		cy.wait("@muutaAsiakas"); //.its('response.statusCode').should('eq', 200);
		
		// Odotetaan että asiakkaat haetaan automaattisesti uudelleen
		cy.wait("@haeAsiakas");

		// Nyt pitäisi löytyä juuri lisätty asiakas taulukosta viimeisenä
		cy.get("table").find("tbody").find("tr").find("td").contains(n).parent().find("td").eq(0).contains(n);   // Nimi
    });
	
	after(() => {
		// Poistetaan testidata ...	
		console.log("MUUTOS: poistetaan testidata, guid:", guid_muutos);
		let url = "https://codez.savonia.fi/jussi/api/asiakas/clear_test.php?guid=" + guid_muutos;
		cy.request(url);
	})

});
