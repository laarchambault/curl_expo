class Product < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews
    has_many :product_ingredients
    has_many :ingredients, through: :product_ingredients
    has_many :favorites
    has_many :users, through: :favorites
end
