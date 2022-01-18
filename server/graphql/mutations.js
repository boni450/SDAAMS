const { User, Appointment } = require('../models')

module.exports = {
	register: async (parent, args, context) => {
		const newUser = await User.create({ ...args })
		return newUser
	},

	addAppointment: async (parent, args, context) => {
		const newAppointment = await Appointment.create({ ...args })
		return newAppointment
	},
}
