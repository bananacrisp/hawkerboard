Given(/^the following products are available:$/) do |products|
	  products.hashes.each do |products|
	  	Product.create(:product_name => products['product name'],
	  					:product_description => products['product description'],
	  					:product_price => products['product price'],
	  		)
	  end
end	

Then(/^I will see the following products:$/) do |products|
  	products.hashes.each do |products|
  	page.should have_content(products['product name'],products['product description'],products['product price'])
  end
end