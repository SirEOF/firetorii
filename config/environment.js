/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'firetorii',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'connect-src': "'self' ws://localhost:3001 localhost:3001",
      'img-src': "'self'",
      'report-uri': "'localhost'",
      'frame-src': "'none'",
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com"
    },
    googleFonts: [
      'Syncopate:400,700'
    ],


    firebase: {
      apiKey: "AIzaSyA6E47Tntslp0TPSYmm2EZNNOsBEBIpy44",
      authDomain: "dreamteam-3e353.firebaseapp.com",
      databaseURL: "https://dreamteam-3e353.firebaseio.com",
      projectId: "dreamteam-3e353",
      storageBucket: "dreamteam-3e353.appspot.com",
      messagingSenderId: "134709081796"
    },
    torii: {
      sessionServiceName: 'session'
    },

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
