/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add: async (req, res) => {
    if (req.method == "POST") {
      let itemName = req.body.itemName;
      let itemPrice = parseInt(req.body.itemPrice);
      let imgBase64Data = req.body.imgBase64Data;
      if (itemName && itemPrice && imgBase64Data) {
        let item = await Items.create({
          itemName: itemName,
          itemPrice: itemPrice,
          imgBase64Data: imgBase64Data
        });
        res.status(200).send("Item has been add to database");
      } else res.status(422).send("Not enough infomation");
    } else res.status(405).send("Method Not Allowed");
  }
};
