# saige

## Part-1
Backend API Setup with Node.js and MongoDB

We have completed a first major section in client side.
However we want to use our own node server with mongoDB
that means the firebase client-side implementation pretty much ends here
We'll use firebase to only log the user and get token.

In our backend we'll validate that token using firebase admin so that our app is well secure.
What I mean by secure is that if we don't check the validatiy of token in the backend 
then anyone can send anything as token to get access to protected routes/resources

Once we implement firebase admin in backend,
when user register or login to our app.
We will create or update user in MongoDB.

Then we will come back to our login/register page and make some adjustments
So that when user login, the response is from our backend...

## Part-2
We are now almost ready to start saving user to database but,
there are few more things to do
1. We need to have the user information to save such as email, name, etc, 
2. To get that data, we can use firebase admin tool
3. In our frontend, user has already registered or login... and then that user is also saved in firebase...
4. That means if you can get the user token from frontend to backend, we can easily use that token do to 2 things
   1. Verify that is is a valid token
   2. Access user info from firebase using that token
5. Let's do these things... so that we can finally save user in database, we will firebase-admin tool to get this doone.

## Part-3
Before admin can create products, there must be categories and subcategories to choose from
Because each product will belong to a category and subcategories that belongs to that category
So let's start with our backend
First we start with category
We create category model, then add some routes and create controller methods to handle those routes

## Part-4
So far we have been able to CRUD categories
Let's refactor our code a bit
Let's try to create re-usable form for both create and update
Then let's also add search/filtering option so that you can type the category name and find it easily from the long list of categories
Then we will move on to subcategories
Afterwards we can start creating products