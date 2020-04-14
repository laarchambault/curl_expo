class UsersController < ApplicationController

    def create
        #add "this user already exists" validation
        user = User.create
        user.username = params[:username]
        user.email = params[:email]
        user.password = params[:password]
        user.hair_type = params[:hair_type]
        user.hair_width = params[:hair_width]
        user.hair_porosity = params[:hair_porosity]
        user.hair_density = params[:hair_density]
        user.save

        render json: user
        #refactor with userParams and mass assignment
    end

    def login
        user = User.find_by email: params[:email]
        #refactor for password
        if user
            render json: user
        else
            render json: {message: "No user found. Create account or try again"}
        end
    end


end