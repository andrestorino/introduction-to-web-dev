/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    createList: async function(req, res) {
        try {
            var createdList = await List.create({
                'title': req.body.title,
                'URL': req.body.URL,
                'items': '',
            }).fetch();
        } catch (err) {
            sails.log(err.name);
            return res.json('Error inserting new record');
        }
        sails.log(createdList);
        return res.json(createdList);
    },
	
	editList: async function(req, res) {
        try {
            var editedList = await List.update({
                'title': req.body.title,
                'URL': req.body.URL,
				'id': req.body.id
            }).fetch();
        } catch (err) {
            sails.log(err.name);
            return res.json('Error inserting new record');
        }
        sails.log(editedList);
        return res.json(editedList);
    },
	
	deleteList: async function(req, res) {
		try {
			var deletedList = await Lists.destroy({
				'title': '',
				'URL': '',
				'id': req.body.id
            }).fetch();
		} catch (err) {
            sails.log(err.name);
            return res.json('Error deleting record');
        }
        sails.log(deletedList);
        return res.json(deletedList);
	}
};
