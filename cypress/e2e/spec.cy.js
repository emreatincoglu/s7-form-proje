describe('Login Form Testleri', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Senaryo A: Başarılı form doldurulduğunda success sayfasına gidiliyor', () => {
    cy.intercept('GET', 'https://6540a96145bedb25bfc247b4.mockapi.io/api/login', {
      statusCode: 200,
      body: [
        { email: 'tech@workintech.com', password: '1234' }
      ]
    }).as('loginRequest');

    cy.get('input[name="email"]').type('tech@workintech.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('input[name="terms"]').check();

    cy.get('button').should('not.be.disabled').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/success');
    cy.contains('Başarılı giriş yaptınız.').should('be.visible');
  });

  it('Senaryo B.1: Yanlış email girildiğinde hata mesajı görünür ve buton pasiftir', () => {
    cy.get('input[name="email"]').type('hataliemail');

    cy.contains('Please enter a valid email address').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('Senaryo B.2: Email ve Password yanlış girildiğinde 2 hata mesajı görünür', () => {
    cy.get('input[name="email"]').type('hatali');
    cy.get('input[name="password"]').type('123');

    cy.contains('Password must be at least 4 characters long').should('be.visible');
    cy.contains('Please enter a valid email address').should('be.visible');
    cy.get('.invalid-feedback').should('have.length', 2);
    
    cy.get('button').should('be.disabled');
  });

  it('Senaryo B.3: Email ve Password doğru ama kurallar kabul edilmediyse buton pasiftir', () => {
    cy.get('input[name="email"]').type('dogru@email.com');
    cy.get('input[name="password"]').type('123456');

    cy.get('button').should('be.disabled');
  });

});