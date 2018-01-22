require 'test_helper'

class CommutersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @commuter = commuters(:one)
  end

  test "should get index" do
    get commuters_url
    assert_response :success
  end

  test "should get new" do
    get new_commuter_url
    assert_response :success
  end

  test "should create commuter" do
    assert_difference('Commuter.count') do
      post commuters_url, params: { commuter: {  } }
    end

    assert_redirected_to commuter_url(Commuter.last)
  end

  test "should show commuter" do
    get commuter_url(@commuter)
    assert_response :success
  end

  test "should get edit" do
    get edit_commuter_url(@commuter)
    assert_response :success
  end

  test "should update commuter" do
    patch commuter_url(@commuter), params: { commuter: {  } }
    assert_redirected_to commuter_url(@commuter)
  end

  test "should destroy commuter" do
    assert_difference('Commuter.count', -1) do
      delete commuter_url(@commuter)
    end

    assert_redirected_to commuters_url
  end
end
