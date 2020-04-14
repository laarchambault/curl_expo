class ReviewsController < ApplicationController

    def create
        review = Review.create
        review.content = params[:content]
        review.score = params[:score]
        review.user_id = params[:user_id]
        review.product_id = params[:product_id]
        review.save

        render json: review, include: [:product, :user]
        #refactor with reviewParams and mass assignment
    end


end