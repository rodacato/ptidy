require 'sinatra/base'
require 'sinatra/config_file'
require 'sinatra/contrib'
require 'sinatra/content_for'

class AppBase < Sinatra::Base
  register Sinatra::ConfigFile

  use Rack::CommonLogger

  helpers Sinatra::ContentFor 

  configure(:production, :development) do
    enable :logging, :dump_errors, :raise_errors, :show_exceptions, :static
  end

  config_file '../config/config.yml'

  before do
    logger.info params
  end

  get '/ping.json' do
    {:status => :ok}.to_json
  end
end
