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
}
