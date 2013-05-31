ItemView = Backbone.View.extend({
	className: '.item',

  initialize: function() {
    Handlebars.registerHelper('itemImage', function() {
      return this.image || '/images/dummy.jpg' ;
    });
  },

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
		//this.vintageIt();
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
      image: $('#item_image').val(),
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
    $('#sign-up-button').on('click', this.signup);
    $('#login-button').on('click', this.login);
    $('#logout-button').on('click', this.logout);
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
  },

  signup: function() {
    hawkerboard.navigate("/sign-up", true);
  },

  login: function() {
    hawkerboard.navigate("/login", true);
  },

  logout: function() {
    $.get('/logout', {}, function() {
      document.cookie = 'rack.session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      hawkerboard.navigate("/", true);
    });
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

SignupView = Backbone.View.extend({
  events: {
    "click #sign-up": "signup"
  },
  render: function() {
    var source = $("#sign-up-form-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template);
  },
  signup: function() {
    var username = $('#username').val();
    var password = $('#password').val();
    var user = new User({username: username, password: password});
    user.save();
    hawkerboard.navigate("/", true);
  }
});

LoginView = Backbone.View.extend({
  events: {
    "click #login": "login"
  },
  render: function() {
    var source = $("#login-form-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template);
  },
  login: function() {
    var username = $('#username').val();
    var password = $('#password').val();
    $.post('/login', {username: username, password: password}, function(data) {
      if(data['logged_in'] == true) {
      hawkerboard.navigate("/", {trigger: true}); //Ask Enrique why trigger is different to just putting true
      } else {
        alert('incorrect username or password');
      }
    })
  }
});

