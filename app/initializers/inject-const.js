App.Constants = Ember.Object.extend({ 
  baseUrl: 'http://mocksvc.mulesoft.com/mocks/cb411226-65f4-4e32-a5cc-2bbd67a2069a/mocks/090da19d-cf15-42c2-ba5c-a7a202d56a26/nia/v0.1/discovery',
  apiUrl: '/api'
});

App.initializer({
  name: 'constant initializer',
  initialize: function(container, application) {
    application.register('constants:main', App.Constants, {
      singleton: true,
      instantiate: true
    });

    application.inject('controller', 'const', 'constants:main');
    application.inject('view', 'const', 'constants:main');
    application.inject('model', 'const', 'constants:main');
    application.inject('route', 'const', 'constants:main');
    application.inject('adapter', 'const', 'constants:main');
  }
});