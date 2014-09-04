App.HomeController = Em.ObjectController.extend({
  // needs: [],
  actions:{
  	logout: function () {
  		console.log('logging out');
  		localStorage.removeItem("fakeLoginToken123");
  		this.transitionToRoute('index');
  	}
  }
});
