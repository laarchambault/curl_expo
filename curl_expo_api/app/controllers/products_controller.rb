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

end