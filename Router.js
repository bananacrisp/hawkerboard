HB = Backbone.Router.extend({
	initialize: function(){
		this.products = new Products;
	},

	routes: {
		"": "index",
	},

	index: function(){
		var index = new ProductsView({el: '.main'});
		var products = new Products;
		products.title = ''

		index.render()
	}
})