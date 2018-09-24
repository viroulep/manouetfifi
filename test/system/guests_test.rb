require "application_system_test_case"

class GuestsTest < ApplicationSystemTestCase
  setup do
    @guest = guests(:one)
  end

  test "visiting the index" do
    visit guests_url
    assert_selector "h1", text: "Guests"
  end

  test "creating a Guest" do
    visit guests_url
    click_on "New Guest"

    fill_in "Avatar", with: @guest.avatar
    fill_in "Country Iso2", with: @guest.country_iso2
    fill_in "Description", with: @guest.description
    fill_in "Name", with: @guest.name
    click_on "Create Guest"

    assert_text "Guest was successfully created"
    click_on "Back"
  end

  test "updating a Guest" do
    visit guests_url
    click_on "Edit", match: :first

    fill_in "Avatar", with: @guest.avatar
    fill_in "Country Iso2", with: @guest.country_iso2
    fill_in "Description", with: @guest.description
    fill_in "Name", with: @guest.name
    click_on "Update Guest"

    assert_text "Guest was successfully updated"
    click_on "Back"
  end

  test "destroying a Guest" do
    visit guests_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Guest was successfully destroyed"
  end
end
