# Make sure to restart server when this file is modified

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:3000/"
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :options, :head, :delete], credentials: true
  end
end