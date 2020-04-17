class FavoritesController < ApplicationController

    def create
        favorite = Favorite.create(user_id: params[:user_id], product_id: params[:product_id], category: params[:category])
        render json: favorite, include: [:user, :product]
    end

    def destroy
        Favorite.destroy(params[:id])
        render json: {message: "Seems your delete was successful"}
    end
end