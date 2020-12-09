if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_daily_manifest_app", domain: "dailymanifest-api.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_daily_manifest_app"
end