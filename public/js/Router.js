Hawkerboard = Backbone.Router.extend({

	initialize: function() {
		this.items = new Items;
		this.loginView = new LoginView({el: '#container'});
	 },

	routes: {
		"": "index",
		"product/:the_cid": "productView",
		"additem": "addItem",
		"sign-up": "signup",
		"login": "login",
		//"logout": "logout",
	},

	index: function(){
		var index = new IndexView({el: '#container', collection: this.items});
		this.items.fetch();
	},

	productView: function(the_cid){
		var productView = new ProductView({el: '#container'});
		productView.renderItem(this.items.get(the_cid));
	},

	addItem: function(){
		var addItemView = new AddItemView({el: '#container', collection: this.items});
		addItemView.render();
	},

	signup: function(){
		var signupView = new SignupView({el: '#container'});
		signupView.render();
	},

	login: function() {
		this.loginView.render();
	},

	thankyou: function(){
	var thankyouView = ThankYouView({el: '#container',});
	}

})