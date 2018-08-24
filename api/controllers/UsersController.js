/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * Vì lý do dùng jsonWebToken để xác thực người dùng,
 * nên không có hàm logout vì bản chất của token là stateless.
 * https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6
 */

module.exports = {
  login: async (req, res) => {
    if (req.method === 'PUT') {
      const userQuery = await Users.findOne({
        username: req.body.username,
      });
      if (!userQuery) {
        return res.notFound();
      }
      const resultVerifyPassword = await sails.helpers.verifyInputPassword(
        req.body.password,
        userQuery.encryptedPassword
      );
      if (!resultVerifyPassword) return res.notFound();
      /*
      Trả về cái gì nếu verify thành công
      token signed bởi jwToken từ object user - cái này không decoded được ở phía frontend,
      chỉ  dùng để khi request từ frontend thì backend sẽ verify nó
       */
      const tokenSigned = await sails.helpers.jwTokenSign(userQuery.username);
      return res.json({ token: tokenSigned, userInfo: userQuery });
    }
    return res.status(405).send('Method Not Allowed');
  },
};
