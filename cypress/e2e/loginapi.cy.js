describe('API Login Test - Success', () => {
  it('Should return 200 Success', () => {
    const startTime = performance.now(); 
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: 'pritha@yopmail.com', 
              password: 'P455@esign.id',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {

           var authToken = response.body.data.token; 
          const endTime = performance.now(); 
          const responseTime = endTime - startTime; 

          expect(response.status).to.eq(200);
          expect(response.body.code).to.eq(200);
          expect(response.body.message).to.include('Success');
          expect(response.body.data).to.have.property('token'); 
          
          console.log('API Response Time:', responseTime.toFixed(2), 'ms');
          

        });
  });
});
describe('API Login Test - Max Response time ', () => {
  it('Should return 200 Success', () => {
    const startTime = performance.now(); 
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: 'pritha@yopmail.com', 
              password: 'P455@esign.id',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {

           var authToken = response.body.data.token; 
          const endTime = performance.now(); 
          const responseTime = endTime - startTime; 

          expect(response.status).to.eq(200);
          expect(response.body.code).to.eq(200);
          expect(response.body.message).to.include('Success');
          expect(response.body.data).to.have.property('token'); 


          const maxResponseTime = 1500; // Misalnya, 1.5 detik sebagai batas
          expect(responseTime).to.be.lessThan(maxResponseTime); // Gagal jika lebih lama dari batas

          console.log('API Response Time:', responseTime.toFixed(2), 'ms');

        });
  });
});
describe('API Login Test - Username Failed', () => {
  it('Should return 200 Success, Status Code 500', () => {
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: 'pritha@yopmail.co', 
              password: 'P455@esign.id',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.code).to.eq(500);
          expect(response.body.message).to.include('Username / password not match');
      });
  });
});
describe('API Login Test - Password Failed', () => {
  it('Should return 200 Success, Status Code 500', () => {
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: 'pritha@yopmail.com', 
              password: 'P455@esign.i',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.code).to.eq(500);
          expect(response.body.message).to.include('Username / password not match');
      });
  });
});
describe('API Login Test - Username and Password Failed', () => {
  it('Should return 200 Success, Status Code 500', () => {
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: 'pritha@yopmail.co', 
              password: 'P455@esign.id',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.code).to.eq(500);
          expect(response.body.message).to.include('Username / password not match');
      });
  });
});
describe('API Login Test - Handle Bad Request', () => {
  it('Should return 400 Bad Request when username is missing', () => {
      cy.request({
          method: 'POST',
          url: 'https://devapi.mesign.id/api/auth/user',
          body: {
              username: '', 
              password: '',
              'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
          },
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.eq(400); 
          expect(response.body.code).to.eq(500); 
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.include('username is mandatory');
      });
  });
});


/*

describe('API Login Test - Multiple Credentials', () => {
    const credentialsList = [
        { username: 'pritha@yopmail.com', password: 'P455@esign.id', expectedCode: 200, expectedMessage: 'Success' },
        { username: 'pritha@yopmail.co', password: 'P455@esign.id', expectedCode: 500, expectedMessage: 'Username / password not match' },
        { username: 'wronguser@yopmail.com', password: 'wrongpassword', expectedCode: 500, expectedMessage: 'Username / password not match' }
    ];

    credentialsList.forEach((credentials) => {
        it(`Should handle login for ${credentials.username}`, () => {
            const startTime = performance.now(); // Catat waktu sebelum request

            cy.request({
                method: 'POST',
                url: 'https://devapi.mesign.id/api/auth/user',
                body: {
                    username: credentials.username,
                    password: credentials.password,
                    'cf-turnstile-response': 'Orwly9INPyFIwdvR4iJbQNFFDXEYX6i8'
                },
                failOnStatusCode: false
            }).then((response) => {
                const endTime = performance.now(); // Catat waktu setelah respons diterima
                const responseTime = endTime - startTime; // Hitung selisih waktu respons

                // Validasi hasil login berdasarkan ekspektasi setiap akun
                expect(response.status).to.eq(200);
                expect(response.body.code).to.eq(credentials.expectedCode);
                expect(response.body.message).to.include(credentials.expectedMessage);

                // Jika login berhasil, pastikan token tersedia
                if (credentials.expectedCode === 200) {
                    expect(response.body.data).to.have.property('token');
                }

                console.log(`API Response Time for ${credentials.username}:`, responseTime.toFixed(2), 'ms');
            });
        });
    });
});