ProductsView = Backbone.View.extend({

	render: function() {
	  var products = this.model.get('products')

      var source = $('#products_template').html();
	  var template = Handlebars.compile(source);
	  this.$el.html(template);

	  this.listenTo('products').forEach(this.renderProduct)
	  products.fetch()

	},

	renderProducts: function(){
		this.model.get('products').forEach(this.renderProduct);
	},
	renderProduct: function(){
		var productView = new ProductView({el: '#product-list', model: product});
		productView.render();
	}
});

ProductView = Backbone.View.extend({

	render: function(){
		var source = $("#product_template").html();
		var template = Handlebars.compile(source);
		$("product-list").append(template)
	}
});