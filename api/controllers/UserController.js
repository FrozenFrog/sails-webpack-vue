/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * Vì lý do dùng jsonWebToken để xác thực người dùng, nên không có hàm logout vì bản chất của token là stateless.
 * https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6
 */

module.exports = {
  login: async (req, res) => {
    if (req.method == 'POST') {
      let userQuery = await User.findOne({
        Username: req.body.username,
        Password: req.body.password
      });
      if (!userQuery) {
        return res.notFound();
      }
      /*
      Trả về cái gì nếu verify thành công
      token signed bởi jwToken từ object user - cái này không decoded được ở phía frontend, chỉ  dùng để khi request từ frontend thì backend sẽ verify nó
       */
      userQuery.Password = null; //Delete password
      const token = await sails.helpers.jwTokenSign(userQuery);
      return res.json({ token: token, userInfo: userQuery });
    } else return res.status(405).send('Method Not Allowed');
  }
};
