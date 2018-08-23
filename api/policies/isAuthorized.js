//Verify header token when request to protected URL
module.exports = async function(req, res, next) {
  // Check if token header is present
  if (req.headers && req.headers.token) {
    //token header is present
    var token = req.headers.token;
  } else {
    //token header is not present
    return res.status(401).send('No token header was found');
  }
  sails.helpers.jwTokenVerify(token).switch({
    error: err => {
      return res.status(500).send('Internal server error');
    },
    invalid: () => {
      return res.status(401).send('Invalid token');
    },
    success: () => {
      return next();
    }
  });
};
