class Item
  include Mongoid::Document

  # fields
  field :title, type: String
  field :price, type: String #maybe this should be a decimal fixnum? (Matt)
  field :description, type: String
  field :tags, type: Array
  field :image, type: Hash
  field :everything, type: String

  # relationships
  #has_and_belongs_to_one :user
  # double check this is a correct relationship syntax for MongoID (Matt)

end