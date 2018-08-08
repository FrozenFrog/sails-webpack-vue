/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async (req, res) => {
    if (req.method == 'POST'){
      let userQuery = await User.findOne({Username: req.body.username})
      if (!userQuery) {
        return res.notFound()
      }
      if (req.body.password == userQuery.Password){
        return res.json(userQuery)
      }
    }
    else res.status(405).send("Method Not Allowed")
  }
}

