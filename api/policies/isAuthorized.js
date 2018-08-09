//Verify header token when request to protected URL
module.exports = function(req, res, next) {
  //Check if token header is present
  sails.log(req.headers)
  if (req.headers && req.headers.token) {
    //token header is present
    var token = req.headers.token
  } else {
    //token header is not present
    return res.status(401).send("No token header was found");
  }
  jwToken.verify(token, function(err, decoded) {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
};
