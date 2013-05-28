ItemView = Backbone.View.extend({
	render: function() {
		var source = $("#item-template").html();
		var template = Handlebars.compile(source);
		var html = template(this.model.toJSON());
		this.$el.append(html);
	}
});

IndexView = Backbone.View.extend({
	render: function() {
		this.collection.forEach(this.renderItem);
	},

	renderItem: function(item) {
		var itemView = new ItemView({el: "#container", model: item});
		itemView.render();
	}
});