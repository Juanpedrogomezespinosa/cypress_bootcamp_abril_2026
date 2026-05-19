/// <reference types="cypress" />

describe("Batería de pruebas de smoke sobre el login", () => {
  const emailValido = "cypress_bootcamp_2026@juanpe.com";
  const passwordValido = "123456789nN.";

  beforeEach(() => {
    // Visitamos la página antes de cada caso de prueba para partir de cero
    cy.visit("https://footer-shop.vercel.app/login");
  });

  it("ID:TC001 - Login exitoso (Camino feliz)", () => {
    // Usamos las variables en lugar de escribir el texto a mano
    cy.get('[type="email"]').type(emailValido);
    cy.get('[formcontrolname="password"]').type(passwordValido);

    // El botón debe habilitarse y hacemos click para iniciar sesión
    cy.get('[type="submit"]').should("not.be.disabled").click();
  });

  it("ID:TC002 - Flujo negativo (Credenciales inválidas)", () => {
    // Usamos el email válido pero una contraseña inventada directamente
    cy.get('[type="email"]').type(emailValido);
    cy.get('[formcontrolname="password"]').type("contraseñaFalsa123");

    // Al rellenar ambos campos, el botón se habilita
    cy.get('[type="submit"]').should("not.be.disabled");
  });

  it("ID:TC003 - Validación Front-end (Ambos campos vacíos)", () => {
    // Comprobamos el estado inicial: los campos están vacíos por defecto
    cy.get('[type="email"]').should("have.value", "");
    cy.get('[formcontrolname="password"]').should("have.value", "");

    // Como no hemos escrito nada, el botón debe estar bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("ID:TC004 - Validación Front-end (Solo Email relleno, Password vacío)", () => {
    // Rellenamos solo el email con nuestra variable
    cy.get('[type="email"]').type(emailValido);

    // Verificamos que el password sigue vacío y revisamos su placeholder
    cy.get('[formcontrolname="password"]')
      .should("have.attr", "placeholder", "Introduce tu contraseña")
      .and("have.value", "");

    // Falta un campo obligatorio, el botón sigue bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("ID:TC005 - Validación Front-end (Solo Password relleno, Email vacío)", () => {
    // Verificamos que el email está vacío
    cy.get('[type="email"]').should("have.value", "");

    // Rellenamos solo la contraseña con nuestra variable
    cy.get('[formcontrolname="password"]').type(passwordValido);

    // Falta el email, el botón sigue bloqueado
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("ID:TC006 - Verificar el click en el ojito para que se vea la contraseña y hace login", () => {
    // Rellenamos email
    cy.get('[type="email"]').should("have.value", "").type(emailValido);

    // Verificamos que la contraseña arranca oculta y la rellenamos
    cy.get('[formcontrolname="password"]')
      .should("have.attr", "type", "password")
      .and("have.value", "")
      .type(passwordValido);

    // Buscamos el botón por su atributo exacto de accesibilidad y hacemos click
    cy.get('button[aria-label="Toggle password visibility"]').click();

    // Validamos que el atributo ha cambiado a texto plano para ser visible
    cy.get('[formcontrolname="password"]').should("have.attr", "type", "text");

    // Una vez visible la contraseña, hacemos click en iniciar sesión para completar el flujo
    cy.get('[type="submit"]').should("not.be.disabled").click();
  });

  it("ID:TC007 - Verificar que la notificación Toast de éxito dura 5 segundos en pantalla", () => {
    // 1. Provocamos la aparición del Toast haciendo login con credenciales correctas
    cy.get('[type="email"]').type(emailValido);
    cy.get('[formcontrolname="password"]').type(passwordValido);
    cy.get('[type="submit"]').click();

    // 2. Comprobamos inmediatamente que el componente Toast aparece y contiene el texto correcto
    cy.get("app-toast")
      .should("be.visible")
      .and("contain", "Inicio de sesión exitoso");

    // 3. VALIDACIÓN DE TIEMPO EXTRA Y VISIBILIDAD:
    // Le damos hasta 10 segundos (10000ms) para curarnos en salud con las animaciones CSS.
    // Usamos 'not.be.visible' porque el tag <app-toast> se queda en el DOM vacío.
    cy.get("app-toast", { timeout: 10000 }).should("not.be.visible");
  });
});
