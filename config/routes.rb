# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development? || Rails.env.test?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
  post '/graphql', to: 'graphql#execute'

  get '/entries(*all)', to: 'entries#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
