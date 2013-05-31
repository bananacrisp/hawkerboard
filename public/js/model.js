Item = Backbone.Model.extend({
});

Items = Backbone.Collection.extend({
  model: Item,
  url: '/items',
});

User = Backbone.Model.extend({
  url: '/users',
});