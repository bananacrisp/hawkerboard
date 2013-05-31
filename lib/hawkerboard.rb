require 'sinatra/base'
require 'mongoid'
require 'aws/s3'
require_relative 'item'

class Hawkerboard < Sinatra::Base

  #this class is a controller
  #this is the app too! - because it is inheriting from Sinatra::Base

  set :views, File.join(File.dirname(__FILE__), '../views')
  set :public_folder, File.join(File.dirname(__FILE__), '../public')
  # enable :sessions
  Mongoid.load!(File.join(File.dirname(__FILE__),'mongoid.yml'))

  helpers do
   def upload(filename, file)
    puts filename
    puts file
      bucket = 'hawkerboard'
      filename = srand.to_s + filename
      AWS::S3::Base.establish_connection!(
        :access_key_id => "AKIAIIZW73LTKTCU5OCQ",
        :secret_access_key => "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"
        )
      AWS::S3::S3Object.store( filename, open(file.path), bucket)
      return  "https://s3.amazonaws.com/hawkerboard/" + filename
    end
  end

  get '/' do
    erb :index
  end

  get '/items' do
    content_type :json
    Item.all.to_json
  end

  # for allowing a user to sign up
  post 'sign_up' do
    user = User.create!(:username =>params['username'], :password => params['password'])
  end

  # for adding a new item
  post '/items' do
    data = JSON.parse(request.body.read.to_s)
    data['tags'] = data['tags'].split(',')
    Item.create(data)
    #so how do we redirect to a confirmation page but within the backbone app...!? (Matt)
  end

  post '/upload' do
    filepath = upload(params[:content]['file'][:filename], params[:content]['file'][:tempfile])
    puts filepath

    #filepath = upload(params[:content]['file'][:filename], params[:content]['file'][:tempfile])
    #puts filepath
    #puts params[:content]['file'][:filename]
    #puts params[:content]['file'][:tempfile]
    #{ image: filepath }.to_json
  end

    get '/upload_fix' do
      puts "hi"
      data = JSON.parse(request.body.read.to_s)
      puts params['item_image']
    end



  # start the server if ruby file executed directly
  run! if app_file == $0
  # really not sure what this is for (Matt)

end