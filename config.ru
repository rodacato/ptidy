require 'rubygems'
require 'bundler/setup'
require File.dirname(__FILE__) + '/tidy'

::RACK_ENV = ENV['RACK_ENV'] || 'development'
Bundler.require(:default, RACK_ENV)

run Tidy::Tester
