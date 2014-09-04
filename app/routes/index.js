App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    if(this.controllerFor('login').get('loggedIn')){
      this.transitionTo('home');
    }else{
      this.transitionTo('login');
    }
  }  
});
