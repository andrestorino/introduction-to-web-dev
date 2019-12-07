/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	createItem: async function(req, res) {
        try {
            var createdItem = await Item.create({
                'data': req.body.data,
                'owner': 'req.body.list'
            }).fetch();
        } catch (err) {
            sails.log(err.name);
            return res.json('Error inserting new record');
        }
        sails.log(createdItem);
        return res.json(createdItem);
    },
	
	deleteItem: async function(req, res) {
        try {
            var deletedItem = await Item.delete({
                'data': '',
                'owner': 'req.body.list'
            }).fetch();
        } catch (err) {
            sails.log(err.name);
            return res.json('Error deleting record');
        }
        sails.log(deletedItem);
        return res.json(deletedItem);
    }

};

