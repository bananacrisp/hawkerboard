Feature: View Products
	In order to waste my money on secondhand junk
	As Bob
	I need to view the products

	What we know:
	==============
	- A product can be created
	- Products are visible
	- Products need a title
	- Products need a price
	- Products need a description

	Open Questions:
	==============
	- 

	Scenario: View products
		Given I am on the Index Page
		And the following products are available:
		|product name	|product description	|product price 	|
		|product 1		|flying car				|100			|
		|product 2		|iphone					|100			|
		Then I will see the following products:
		|product name	|product description	|product price	|
		|product 1		|flying car				|10             |
		|product 2		|iphone					|100			|