ItemView = Backbone.View.extend({
	className: '.item',

  /*
  	see stackoverflow/questions/11932125
  	searched for backbone.js dynamic events
  */
	events: function() {
		var _events = {};
		_events["click #" + this.model.cid] = 'displayProduct';
		return _events;
	},

	displayProduct: function(){
		hawkerboard.navigate("product/"+this.model.cid, {trigger: true});
	},

	render: function() {
		var source = $("#item-template").html();
		var template = Handlebars.compile(source);
		var context = this.model.toJSON();
		var cid = this.model.cid;
		context['cid'] = cid;
		var html = template(context);
		this.$el.append(html);
		this.changeBackground();
		this.vintageIt();
	},

	changeBackground: function() {
		var image = this.model.get('image')|| "../images/fake.jpg";
		var background = $("#"+this.model.cid).css("background", "url("+image+") center center no-repeat");
	},

	vintageIt: function() {
		 var options = {
     };
     var effect = {
        vignette: 0.4,
        sepia: true
     };
     $('#'+this.model.cid+" header img").vintage(options, effect);
	}
});


ItemCardView = Backbone.View.extend({
	render: function() {
		var source = $("#product-template").html();
		var template = Handlebars.compile(source);
		var context = this.model.toJSON();
		var cid = this.model.cid;
		context['cid'] = cid;
		var html = template(context);
		this.$el.html(html);
	},
});

AddItemFormView = Backbone.View.extend({
  events: {
    'click #add-item': 'submit'
  },

  render: function() {
    var source = $("#add-item-form-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(source);
  },
  submit: function() {
    this.collection.create({
      title: $('#item_name').val(),
      price: $('#item_price').val(),
      description: $('#item_description').val(),
      tags: $('#item_tags').val(),
    });
    hawkerboard.navigate("/", true);
   },
});


IndexView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render);
	},

	render: function() {
		$('#container').html('');
		this.collection.forEach(this.renderItem);
    $('#searchbox').on('keyup', $.proxy(this.search, this));
		$('#add-item-button').on('click', this.displayAddItem);
	},

	displayAddItem: function(){
		hawkerboard.navigate("additem", {trigger: true});
	},

	renderItem: function(item) {
		var itemView = new ItemView({el: "#container", model: item});
		itemView.render();
	},

  search: function() {
    $('#container').html('');
    var searchQuery = $('#searchbox').val();
    var result = this.collection.where({title: searchQuery});
    _.each(result, this.renderItem);
  }
});


ProductView = Backbone.View.extend({
	renderItem: function(item) {
		var itemCardView = new ItemCardView({el: "#container", model: item});
		itemCardView.render();
	}
});

AddItemView = Backbone.View.extend({
	render: function() {
		var addItemForm = new AddItemFormView({el: "#container", collection: this.collection})
		addItemForm.render();
	}
});

