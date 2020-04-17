class ProductsController < ApplicationController

    def index
        products = Product.all
        render json: products
    end

    def show
        product = Product.find(params[:id])
        #refactor for find_or_create_by
        render json: product, include: { ingredients: {}, :reviews => { include: :user}}
    end

    def create 
        product = Product.create
        product.name = params[:name]
        product.brand = params[:brand]
        product.image = params[:image]
        product.save
        render json: product
    end

    def update
        product = Product.find(params[:id])
        if product
            product.update(name: params[:name], brand: params[:brand], image: params[:image])
            render json: product
        else
            render json: {message: "Unable to update product"}
        end
    end

end