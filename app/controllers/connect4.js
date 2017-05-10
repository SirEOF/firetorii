import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    dothis: function() {
      let element = Ember.$(event.target);
      let ycord = Ember.$('.board tr').index(element.closest('tr'));
      let xcord = element.closest('tr').find('td').index(element.closest('td'));
      element.addClass("red");
      console.log("x-coordinate ", xcord);
      console.log("y-coordinate ", ycord);
    }
  }
});
