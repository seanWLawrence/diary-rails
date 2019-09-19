# frozen_string_literal: true

Rails.application.routes.draw do
  root 'sessions#new'

  resources :sessions, only: [:new, :create, :destroy]

  get '/', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'

  if Rails.env.development? || Rails.env.test?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  get '/entries(*all)', to: 'entries#index'
end
