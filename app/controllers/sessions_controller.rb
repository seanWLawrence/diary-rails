class SessionsController < ApplicationController
  def new; end

  def create
    diary_key = params[:diary_key]

    if diary_key == ENV['DIARY_KEY']
      session[:authenticated] = true
      redirect_to '/entries'
    else
      flash.now[:alert] = 'Invalid diary key'
      render 'new'
    end
  end

  def destroy
    session[:authenticated] = false
    redirect_to root_url, notice: 'Logged out successfully!'
  end
end
