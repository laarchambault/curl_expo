class ProductsController < ApplicationController

    def index
        products = Product.all
        render json: products
    end

    def show
        product = Product.find(params[:id])
        #refactor for find_or_create_by
        render json: product, include: [:reviews, :users]
    end

    def create 
        product = Product.create
        product.name = params[:name]
        product.brand = params[:brand]
        product.image = params[:image]
        product.save
        render json: product
    end

end