require 'sinatra/base'
require 'mongoid'

class Hawkerboard < Sinatra::Base
  
  #this class is a controller
  #this is the app too! - because it is inheriting from Sinatra::Base

  set :views, File.join(File.dirname(__FILE__), '../views')
  set :public_folder, File.join(File.dirname(__FILE__), '../public')
  # enable :sessions
  #Mongoid.load!(File.join(File.dirname(__FILE__),'mongoid.yml'))

  get '/' do
    erb :homepage
  end




  # start the server if ruby file executed directly
  run! if app_file == $0
  # really not sure what this is for (Matt)

end