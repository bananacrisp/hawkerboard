Hawkerboard = Backbone.Router.extend({

	routes: {
		"": "index",
	},

	index: function(){
		var items = new Items([{"title": "brown Shoes", "price": "55", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]},
								{"title": "black Shoes", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]},
								{"title": "blue Shoes", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]},
								{"title": "yellow Shoes", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]},
								{"title": "brown Shoes", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]},
								{"title": "brown Shoes", "description": "Churchs premium brown Shoes",
								"tags": ["brown", "mens", "brougue"]}]);
		var index = new IndexView({el: '#container', collection: items});
		index.render();
	}
})