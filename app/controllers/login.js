App.LoginController = Em.Controller.extend({
  reset: function() {
    this.setProperties({
      grant_type:"password",
      username: "",
      password: "",
      errorMessages: null
    });
    //get token from local storage "remember me"
    this.set('token', localStorage.fakeLoginToken123);
    this.set('currentUser', null);
  },
  token: "",
  loggedIn: function(){
    return localStorage.fakeLoginToken123 && localStorage.fakeLoginToken123.length > 0;
  }.property('token'),
  setCurrentUser: function(data){
    this.set('currentUser', data);
  },
  actions:{
    login:function(){
      console.log('logging in');

      this.set('errorMessages', null);
      if (this.get('username') == 'user' && this.get('password')== 'password') {
        localStorage.fakeLoginToken123 = "some random number";
        this.transitionToRoute('home');
      }else {
        localStorage.fakeLoginToken123 = "";
        this.set('errorMessages', ["Invalid credentials.  Try 'user' and 'password'"]);
      }

    }
  }
});
