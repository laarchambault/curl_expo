class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def create
        ingredient = Ingredient.find_or_create_by(name: params[:name])
        join = ProductIngredient.create(ingredient_id: ingredient.id, product_id: params[:product_id])
        render json: join, include: [:product, :ingredient]
    end

end