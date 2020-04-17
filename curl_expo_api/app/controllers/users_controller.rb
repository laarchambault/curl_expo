class UsersController < ApplicationController

    def show
        user = User.find(params[:id])
            render json: user, include: { favorites: {include: :product}}
    end
    
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

    def update
        user = User.find(params[:id])
        if user
            user.update(username: params[:username], email: params[:email], password: params[:password], hair_type: params[:hair_type], hair_width: params[:hair_width], hair_porosity: params[:hair_porosity], hair_density: params[:hair_density])
            render json: user
        else
            render json: {message: "Unable to update user"}
        end
    end


end