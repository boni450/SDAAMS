const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User, Appointment, Chat } = require('../models')

require('dotenv').config()

module.exports = {
	user: async (parent, { id }, context) => {
		return await User.findByPk(id)
	},

	users: async (
		parent,
		{ offset, limit, userId, orderBy, orderCol },
		context
	) => {
		return await User.findAll({
			offset: offset || 0,
			limit: limit || 100,
			order: [[orderCol || 'id', orderBy || 'ASC']],
		})
	},

	userSearch: async (parent, { keyword }, context) => {
		return await User.findAll({
			limit: 100,
			where: {
				[Op.or]: [
					{ email: { [Op.like]: `%${keyword}%` } },
					{ lastName: { [Op.like]: `%${keyword}%` } },
					{ firstName: { [Op.like]: `%${keyword}%` } },
				],
			},
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

	appointments: async (
		parent,
		{ offset, limit, userId, orderBy, orderCol },
		context
	) => {
		return await Appointment.findAll({
			offset: offset || 0,
			limit: limit || 100,
			where: userId
				? {
						[Op.or]: [{ ownerId: userId }, { approverId: userId }],
				  }
				: {},
			order: [[orderCol || 'id', orderBy || 'ASC']],
		})
	},

	chat: async (parent, { id }, context) => {
		return await Chat.findByPk(id)
	},

	chats: async (
		parent,
		{ offset, limit, userId, orderBy, orderCol },
		context
	) => {
		return await Chat.findAll({
			offset: offset || 0,
			limit: limit || 100,
			where: userId
				? {
						[Op.or]: [{ senderId: userId }, { receiverId: userId }],
				  }
				: {},
			order: [[orderCol || 'id', orderBy || 'ASC']],
		})
	},

	analytics: async (parent, args, context) => {
		return {
			comments: 0,
			users: await User.count(),
			appointments: await Appointment.count(),
			bookings: await Appointment.count({ where: { isApproved: true } }),
		}
	},
}
