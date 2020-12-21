namespace :start do
  task :production do
    exec 'YARN_PRODUCTION=false yarn run postinstall && foreman start'
  end
end