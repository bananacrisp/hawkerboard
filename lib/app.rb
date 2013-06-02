require 'sinatra'
require 'stripe'

set :publishable_key, 'pk_test_VXWpWC81B0aNirU54T9XzUEH'
set :secret_key, "sk_test_FfmJ08mn4ciYHkwNKYOz0J2z"

Stripe.api_key = settings.secret_key

get '/' do
  erb :index
end

get '/charge' do
  erb :charge
end

post '/charge' do
  @amount = 500

  customer = Stripe::Customer.create(
    :email => 'customer@example.com',
    :card  => params[:stripeToken]
  )

  charge = Stripe::Charge.create(
    :amount      => @amount,
    :description => 'Sinatra Charge',
    :currency    => 'gbp',
    :customer    => customer
  )

  erb :charge
end

__END__

@@ layout
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
    <%= yield %>
  </body>
  </html>

@@index
  <form action="/charge" method="post">
    <article>
      <label class="amount">
        <span>Amount: $5.00</span>
      </label>
    </article>

    <script src="https://checkout.stripe.com/v2/checkout.js" class="stripe-button" data-key="<%= settings.publishable_key %>"></script>
  </form>

@@charge
  <h2>Thanks, you paid <strong>$5.00</strong>!</h2>