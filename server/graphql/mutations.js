const jwt = require('jsonwebtoken')
const { User, Appointment } = require('../models')

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

	addAppointment: async (parent, args, context) => {
		return await Appointment.create({ ...args })
	},

	updateAppointment: async (parent, args, context) => {
		await Appointment.update({ ...args }, { where: { id: args?.id } })
		return await Appointment.findByPk(args?.id)
	},

	deleteAppointment: async (parent, { id }, context) => {
		await Appointment.destroy({ where: { id } })
		return 'ok'
	},
}
