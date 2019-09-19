require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'root url' do
    get '/'
    assert_response :success
  end

  test 'should post create' do
    post '/login'
    assert_response :success
  end

  test 'should get destroy' do
    get '/logout'
    assert_response :success
  end
end
