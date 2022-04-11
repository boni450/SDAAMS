const { User, Comment, Appointment } = require('../models')

module.exports = {
	User: {
		appointments: async ({ id }, args, context) => {
			return await Appointment.findAll({ where: { ownerId: id } })
		},
		appointmentCount: async ({ id }, args, context) => {
			return await Appointment.count({ where: { ownerId: id } })
		},
		commentCount: async ({ id }, args, context) => {
			return await Comment.count({ where: { userId: id } })
		},
		name: async ({ id }, args, context) => {
			const user = await User.findByPk(id)
			return user?.firstName + ' ' + user?.lastName
		},
	},

	Appointment: {
		owner: async ({ ownerId }, args, context) => {
			return await User.findByPk(ownerId)
		},
		approver: async ({ approverId }, args, context) => {
			return await User.findByPk(approverId)
		},
	},

	Chat: {
		sender: async ({ senderId }, args, context) => {
			return await User.findByPk(senderId)
		},
		receiver: async ({ receiverId }, args, context) => {
			return await User.findByPk(receiverId)
		},
	},

	Notification: {
		user: async ({ userId }, args, context) => {
			return await User.findByPk(userId)
		},
	},

	Announcement: {
		user: async ({ userId }, args, context) => {
			return await User.findByPk(userId)
		},
	},

	Comment: {
		user: async ({ userId }, args, context) => {
			return await User.findByPk(userId)
		},
		appointment: async ({ appointmentId }, args, context) => {
			return await Appointment.findByPk(appointmentId)
		},
	},
}
