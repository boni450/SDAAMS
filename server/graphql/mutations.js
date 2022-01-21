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
		const newAppointment = await Appointment.create({ ...args })
		return newAppointment
	},
}
