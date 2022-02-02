const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

require('dotenv').config()

module.exports = {
	user: async (parent, { id }, context) => {
		return await User.findByPk(id)
	},

	users: async (parent, args, context) => {
		return await User.findAll({
			offset: args.offset || 0,
			limit: args.limit || 100,
			order: [[args.orderByCol || 'id', args.orderBy || 'ASC']],
		})
	},

	login: async (parent, args, context) => {
		const thisUser = await User.findOne({ where: { ...args } })

		return jwt.sign(
			{
				data: {
					id: thisUser.id,
					role: thisUser.role,
					email: thisUser.email,
					image: thisUser.image,
					lastName: thisUser.lastName,
					firstName: thisUser.firstName,
				},
			},
			process.env.JWT_KEY,
			{ expiresIn: '30d' }
		)
	},

	appointment: async (parent, { id }, context) => {
		return await Appointment.findByPk(id)
	},

	appointments: async (parent, args, context) => {
		return await Appointment.findAll({
			offset: args.offset || 0,
			limit: args.limit || 100,
			where: { ownerId: args.ownerId || { [Op.not]: null } },
			order: [[args.orderByCol || 'id', args.orderBy || 'ASC']],
		})
	},

	analytics: async (parent, args, context) => {
		return {
			users: await User.count(),
			appointments: await Appointment.count(),
			bookings: await Appointment.count({ where: { isApproved: true } }),
			comments: 0,
		}
	},
}
