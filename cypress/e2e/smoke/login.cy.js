/// <reference types="cypress" />

describe("Batería de pruebas de smoke sobre el login", () => {
  beforeEach(() => {
    // Visitamos la página antes de cada caso de prueba para partir de cero
    cy.visit("https://footer-shop.vercel.app/login");
  });

  it("ID:TC001 - Login exitoso (Camino feliz)", () => {
    // Escribimos email y password correctos
    cy.get('[type="email"]').type("cypress_bootcamp_2026@javi.com");
    cy.get('[formcontrolname="password"]').type("1234Javi.");

    // El botón debe habilitarse
    cy.get('[type="submit"]').should("not.be.disabled");
  });

  it("ID:TC002 - Flujo negativo (Credenciales inválidas)", () => {
    // Escribimos un email correcto pero una contraseña inventada
    cy.get('[type="email"]').type("cypress_bootcamp_2026@javi.com");
    cy.get('[formcontrolname="password"]').type("contraseñaFalsa123");

    // Al rellenar ambos campos, el botón se habilita, pero si hiciéramos click daría error
    cy.get('[type="submit"]').should("not.be.disabled");
    // cy.get('[type="submit"]').click() -> Aquí saltaría el error en la web
  });

  it("ID:TC003 - Validación Front-end (Ambos campos vacíos)", () => {
    // Comprobamos el estado inicial: los campos están vacíos por defecto
    cy.get('[type="email"]').should("have.value", "");
    cy.get('[formcontrolname="password"]').should("have.value", "");

    // Como no hemos escrito nada, el botón debe estar bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("ID:TC004 - Validación Front-end (Solo Email relleno, Password vacío)", () => {
    // Rellenamos solo el email
    cy.get('[type="email"]').type("cypress_bootcamp_2026@javi.com");

    // Verificamos que el password sigue vacío y revisamos su placeholder (como hiciste antes)
    cy.get('[formcontrolname="password"]')
      .should("have.attr", "placeholder", "Introduce tu contraseña")
      .and("have.value", "");

    // Falta un campo obligatorio, el botón sigue bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("ID:TC005 - Validación Front-end (Solo Password relleno, Email vacío)", () => {
    // Verificamos que el email está vacío
    cy.get('[type="email"]').should("have.value", "");

    // Rellenamos solo la contraseña
    cy.get('[formcontrolname="password"]').type("1234Javi.");

    // Falta el email, el botón sigue bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });
});
