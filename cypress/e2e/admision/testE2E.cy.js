describe("Prueba E2E del formulario de admisión - UTEC", () => {
  let userData;

  beforeEach(() => {
    cy.visit("/inscribete/form.php");
    cy.fixture("userdata").then((userdata) => {
      userData = userdata;
    });
  });

  it("Completando el formulario de admisión - OK", () => {
    //Datos postulante
    cy.get("#input20").select(userData.sQuienEs).should("have.value", "1");
    cy.get("#input21").type(userData.iNombres);
    cy.get("#input22").type(userData.iApePaterno);
    cy.get("#input23").type(userData.iApeMaterno);
    cy.get("#input24").type(userData.iEmailValido);
    cy.get("#input25").type(userData.iCelular);
    cy.get("#input26").select(userData.sGrado).should("have.value", "8");

    //Carrera de interes
    cy.get("#check31").click().should("have.value", "5");

    //Informacion sobre
    cy.get("#check55").click().should("have.value", "Becas");
    cy.get("#check56").click().should("have.value", "Pensiones");

    //Politica de privacidad
    cy.get("#policy2").click();
    cy.get("#input29").click();

    //Enviar formulario
    cy.get('button[class="g-recaptcha"]').click();

    //Validando que se haya enviado el formulario de forma correcta
    cy.url().should("include", "/inscribete/thank.php");
  });

  it("Completando el formulario de admisión - NOK", () => {
    //Datos postulante
    cy.get("#input20").select(userData.sQuienEs).should("have.value", "1");
    cy.get("#input21").type(userData.iNombres);
    cy.get("#input22").clear(); //Apellido paterno vacío
    cy.get("#input23").type(userData.iApeMaterno);
    cy.get("#input24").type(userData.iEmailInvalido); //Email inválido
    cy.get("#input25").type(userData.iCelular);
    cy.get("#input26").select(userData.sGrado).should("have.value", "8");

    //Carrera de interes
    cy.get("#check31").click().should("have.value", "5");

    //Informacion sobre
    cy.get("#check55").click().should("have.value", "Becas");
    cy.get("#check56").click().should("have.value", "Pensiones");

    //Politica de privacidad
    cy.get("#policy2").click();
    cy.get("#input29").click();

    //Enviar formulario
    cy.get('button[class="g-recaptcha"]').click();

    //Validando obligatoriedad de apellido paterno
    cy.get("#input22-error")
      .should("be.visible")
      .and("contain", "This field is required.");

    //Validando formato de email
    cy.get("#input24-error")
      .should("be.visible")
      .and("contain", "Email inválido");

    cy.url().should("not.include", "/inscribete/thank.php");
  });
});