class Products
	include Mongoid::Document
	field :product_group, type: String

	has_many :posts
end