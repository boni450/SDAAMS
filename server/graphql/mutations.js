const jwt = require('jsonwebtoken')
const { User, Appointment, Chat, Notification } = require('../models')

require('dotenv').config()

module.exports = {
	register: async (parent, args, context) => {
		const newUser = await User.create({ ...args })
		return jwt.sign(
			{
				data: {
					id: newUser.id,
					role: newUser.role,
					email: newUser.email,
					image: newUser.image,
					lastName: newUser.lastName,
					firstName: newUser.firstName,
				},
			},
			process.env.JWT_KEY,
			{ expiresIn: '30d' }
		)
	},

	updateUser: async (parent, args, context) => {
		await User.update({ ...args }, { where: { id: args?.id } })
		const user = await User.findByPk(args?.id) // FIXME
		return jwt.sign(
			{
				data: {
					id: user?.id,
					role: user?.role,
					email: user?.email,
					image: user?.image,
					lastName: user?.lastName,
					firstName: user?.firstName,
				},
			},
			process.env.JWT_KEY,
			{ expiresIn: '30d' }
		)
	},

	addAppointment: async (parent, args, context) => {
		const appointment = await Appointment.create({ ...args })
		if (args?.ownerId != args?.approverId) {
			const owner = await User.findByPk(args?.ownerId)
			await Notification.create({
				userId: args?.approverId,
				message:
					owner.firstName +
					' ' +
					owner.lastName +
					' - requested an appointment',
				link: '/appointment/' + appointment.id,
			})
		}
		return appointment
	},

	updateAppointment: async (parent, args, context) => {
		await Appointment.update({ ...args }, { where: { id: args?.id } })
		return await Appointment.findByPk(args?.id) // FIXME
	},

	deleteAppointment: async (parent, { id }, context) => {
		await Notification.destroy({ where: { link: '/appointment/' + id } })
		await Appointment.destroy({ where: { id } })
		return 'ok'
	},

	updateNotification: async (parent, args, context) => {
		await Notification.update({ ...args }, { where: { id: args?.id } })
		return await Notification.findByPk(args?.id) // FIXME
	},

	addChat: async (parent, { email, message, senderId }, context) => {
		const user = await User.findOne({ where: { email } })
		return await Chat.create({ message, senderId, receiverId: user.id })
	},

	deleteChat: async (parent, { id }, context) => {
		await Chat.destroy({ where: { id } })
		return 'ok'
	},
}
