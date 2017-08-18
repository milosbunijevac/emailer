First thing I need to do is check how many "to" recipients there are.

Each recipient gets an object that contains one address. The object is in the overall recipients array.
  -------
  req.body.to.split(',') splits the email addresses used into an array that I can use to identify individual emails and the regex eliminates whitespace in between the comma and next email
  -------

  Input handling: check how to make sure input is email (from html side?)

Take the inputs from req.body and check how many of each there are. make an array of objects with each "bcc, cc, to". The function arrayMaker will do this.

Now I should most likely remove the source field input and just default send from MB85Photograhy@mb85.net.