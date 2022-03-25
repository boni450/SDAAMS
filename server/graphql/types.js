const { User, Appointment } = require('../models')

module.exports = {
	User: {
		appointments: async ({ id }, args, context) => {
			return await Appointment.findAll({ where: { ownerId: id } })
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
