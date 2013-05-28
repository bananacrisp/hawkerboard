class Product
	include Mongoid::Document
	field :title, type: String
	field :description, type: String
	field :price, type: Integer
	belongs_to :products
end
