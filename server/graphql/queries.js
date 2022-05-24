const {
  User,
  Chat,
  Comment,
  Appointment,
  Notification,
  Announcement,
} = require('../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

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
          { email: { [Op.like]: `%${keyword}%` }, role: 'staff' },
          { lastName: { [Op.like]: `%${keyword}%` }, role: 'staff' },
          { firstName: { [Op.like]: `%${keyword}%` }, role: 'staff' },
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

  notification: async (parent, { id }, context) => {
    return await Notification.findByPk(id)
  },

  notificationCount: async (
    parent,
    { offset, limit, userId, orderBy, orderCol },
    context
  ) => {
    return await Notification.count({
      offset: offset || 0,
      limit: limit || 100,
      where: userId ? { userId, isSeen: false } : { isSeen: false },
      order: [[orderCol || 'id', orderBy || 'ASC']],
    })
  },

  notifications: async (
    parent,
    { offset, limit, userId, orderBy, orderCol },
    context
  ) => {
    return await Notification.findAll({
      offset: offset || 0,
      limit: limit || 100,
      where: userId ? { userId } : {},
      order: [[orderCol || 'id', orderBy || 'ASC']],
    })
  },

  announcement: async (parent, { id }, context) => {
    return await Announcement.findByPk(id)
  },

  announcements: async (
    parent,
    { offset, limit, orderBy, orderCol },
    context
  ) => {
    return await Announcement.findAll({
      offset: offset || 0,
      limit: limit || 100,
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

  comment: async (parent, { id }, context) => {
    return await Comment.findByPk(id)
  },

  comments: async (
    parent,
    { id, offset, limit, orderBy, orderCol },
    context
  ) => {
    return await Comment.findAll({
      offset: offset || 0,
      limit: limit || 100,
      where: id ? { appointmentId: id } : {},
      order: [[orderCol || 'id', orderBy || 'ASC']],
    })
  },

  analytics: async (parent, args, context) => {
    return {
      users: await User.count(),
      comments: await Comment.count(),
      appointments: await Appointment.count(),
      bookings: await Appointment.count({ where: { isApproved: true } }),
    }
  },

  printActivity: async (parent, { userId, range }, context) => {
    let condition = { [Op.or]: [{ ownerId: userId }, { approverId: userId }] }

    if (range == 'today')
      condition = {
        [Op.or]: [{ ownerId: userId }, { approverId: userId }],
        startDate: {
          [Op.gt]: new Date().setHours(0, 0, 0, 0),
          [Op.lt]: new Date().setHours(23, 59, 59, 59),
        },
      }
    if (range == 'week')
      condition = {
        [Op.or]: [{ ownerId: userId }, { approverId: userId }],
        startDate: {
          [Op.gt]: new Date().setDate(new Date().getDate() - 6),
          [Op.lt]: new Date().setDate(new Date().getDate() + 6),
        },
      }
    if (range == 'month')
      condition = {
        [Op.or]: [{ ownerId: userId }, { approverId: userId }],
        startDate: {
          [Op.gt]: new Date().setDate(0),
          [Op.lt]: new Date().setDate(31),
        },
      }
    const json = await Appointment.findAll({
      raw: true,
      limit: 100,
      attributes: [
        'id',
        'name',
        'description',
        'isApproved',
        'ownerId',
        'startDate',
        'endDate',
        'createdAt',
      ],
      where: condition,
      order: [['id', 'ASC']],
    })

    require('fs').writeFileSync(
      process.cwd() + '/public/report.xlsx',
      require('json2xls')(json),
      'binary'
    )

    return '/downloads/report.xlsx'
  },
}
