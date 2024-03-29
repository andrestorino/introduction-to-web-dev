/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		title: {
			type: 'string',
			allowNull: true
		},
		
		URL: {
			type: 'string',
			allowNull: true
		},
		
		items: {
			collection: 'item',
			via: 'owner'
		}

  }

};

