First thing I need to do is check how many "to" recipients there are.

Each recipient gets an object that contains one address. The object is in the overall recipients array.
  -------
  req.body.to.split(',') splits the email addresses used into an array that I can use to identify individual emails and the regex eliminates whitespace in between the comma and next email
  -------

  Input handling: check how to make sure input is email (from html side?)

Take the inputs from req.body and check how many of each there are. make an array of objects with each "bcc, cc, to". The function arrayMaker will do this.

Now I should most likely remove the source field input and just default send from MB85Photograhy@mb85.net.

Test1: PASSED
Does sendgrid work with just a to recipient

Test2: PASSED
Does sendgrid work with to, cc and bcc recipients

Test3: PASSED
Does sendgrid work with multiple to, cc, and bcc recipients

Test4: PASSED
Does sparkpost work with just a to recipient

Test5: PASSED
Does sparkpost work with to, cc and bcc recipients

Test6: PASSED
Does sparkpost work with multiple to, cc, and bcc recipients

Do input cleaning. I can do something on the client side to check for a valid input by using this:
https://stackoverflow.com/questions/39772756/regular-expression-to-validate-comma-separated-email-addresses

  Basically I'll have to seperate and loop through the email addresses then check em with a regex.

I can isolate all emails to their basic form, now I have to see if they are valid emails. Using an npm package it looks like I can successfully validate emails. PASSED

Now when I can't send an email, I need to notify the user that the send failed or succeeded. PASSED


Test1: PASSED
Does sendgrid work with just a to recipient

Test2: PASSED
Does sendgrid work with to, cc and bcc recipients

Test3: PASSED
Does sendgrid work with multiple to, cc, and bcc recipients

Test4: PASSED
Does sparkpost work with just a to recipient

Test5: PASSED
Does sparkpost work with to, cc and bcc recipients

Test6: PASSED
Does sparkpost work with multiple to, cc, and bcc recipients

Make the front page look good.