require 'sinatra/base'
require 'mongoid'
require 'aws/s3'
require 'stripe'

require_relative 'item'
require_relative 'user'

class Hawkerboard < Sinatra::Base

  #this class is a controller
  #this is the app too! - because it is inheriting from Sinatra::Base

  #from the Strip Tutorial (part1)
  set :publishable_key, 'pk_test_VXWpWC81B0aNirU54T9XzUEH'
  set :secret_key, "sk_test_FfmJ08mn4ciYHkwNKYOz0J2z"
  Stripe.api_key = settings.secret_key


  set :views, File.join(File.dirname(__FILE__), '../views')
  set :public_folder, File.join(File.dirname(__FILE__), '../public')
  use Rack::Session::Cookie, {:http_only => true}

  Mongoid.load!(File.join(File.dirname(__FILE__),'mongoid.yml'))

  helpers do
   def upload(filename, file)

      bucket = 'hawkerboard'
      filename = srand.to_s

      file = Tempfile.new('filename')
      file.write uploaded_file.to_s

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

  #from the Stripe Tutorial (part2)
  post '/charge'  do

  customer = Stripe::Customer.create(
    :email => 'customer@example.com',
    :card  => params[:stripeToken]
  )

  charge = Stripe::Charge.create(
    :amount      => params['charge'],
    :description => 'Sinatra Charge',
    :currency    => 'gbp',
    :customer    => customer
  )
  erb :index
end

error Stripe::CardError do
    env['sinatra.error'].message
end


  get '/items' do
    content_type :json
    Item.all.to_json
  end

  # for allowing a user to sign up
  post '/users' do
    User.create(JSON.parse(request.body.read.to_s))
  end

  post '/login' do #why json?
    content_type :json

    user = User.first({:conditions=>{:username=>params['username']}})

    if user.nil?
      {logged_in: false}.to_json

    elsif user.password == params['password']
      session[:user] = user._id
      {logged_in: true}.to_json

    else
      {logged_in: false}.to_json
    end
  end

  get '/logout' do
    session[:user] = nil
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
    item = Item.last
    item.update_attribute(:image, filepath)
    puts filepath
    redirect '/'

  end

  # start the server if ruby file executed directly
  run! if app_file == $0
  # really not sure what this is for (Matt)

end

