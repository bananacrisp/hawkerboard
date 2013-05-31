Hawkerboard = Backbone.Router.extend({

	initialize: function() {
		this.items = new Items;
	 },

	routes: {
		"": "index",
		"product/:the_cid": "productView",
		"additem": "addItem",
		"upload_fix": "upload_fix",
	},

	index: function(){
		var index = new IndexView({el: '#container', collection: this.items});
		this.items.fetch();
	},

	productView: function(the_cid){
		console.log(the_cid);
		var productView = new ProductView({el: '#container'});
		productView.renderItem(this.items.get(the_cid));
	},

	addItem: function(){
		var addItemView = new AddItemView({el: '#container', collection: this.items});
		addItemView.render();
	}

})