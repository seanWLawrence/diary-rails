# frozen_string_literal: true

class EntriesController < ApplicationController
  def index
    if logged_in?
      render :index
    else
      redirect_to '/' unless logged_in?
    end
  end
end
