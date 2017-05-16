export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'websockets',
  initialize: function(container, app) {
        app.inject('component', 'websockets', 'service:websockets');
        app.inject('controller', 'websockets', 'service:websockets');
  }
};
