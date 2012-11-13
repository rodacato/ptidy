$:.unshift File.expand_path('lib', File.dirname(__FILE__))

require 'app_base'
require 'json'
require 'cgi'

module Tidy
  class Tester < AppBase

    set :root, File.dirname(__FILE__)
    set :views, Proc.new { File.join(settings.root, "views") }

    get '/' do
      erb :home
    end

    post '/tidy' do
      @res = `node lib/beautify/beautifier.js #{params[:site]}`
      @raw = `node lib/beautify/beautifier_raw.js #{params[:site]}`
      erb :result
    end
  end
end
