import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const ANALYTICS = gql`
  query Analytics {
    analytics {
      appointments
      comments
      bookings
      users
    }
  }
`

export const PRINT_ACTIVITY = gql`
  query PrintActivity($range: String!, $userId: Int!) {
    printActivity(range: $range, userId: $userId)
  }
`

export const GET_APPOINTMENT = gql`
  query GetAppointment($id: Int!) {
    appointment(id: $id) {
      id
      name
      description
      color
      endDate
      startDate
      ownerId
      approverId
      createdAt
      updatedAt
      isApproved
      owner {
        id
        firstName
        lastName
      }
      approver {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_APPOINTMENTS = gql`
  query GetAppointments(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: String
    $orderCol: String
  ) {
    appointments(
      limit: $limit
      offset: $offset
      userId: $userId
      orderBy: $orderBy
      orderCol: $orderCol
    ) {
      id
      name
      description
      color
      endDate
      startDate
      ownerId
      approverId
      createdAt
      updatedAt
      isApproved
      owner {
        id
        firstName
        lastName
      }
      approver {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_ANNOUNCEMENT = gql`
  query GetAnnouncement($id: Int!) {
    announcement(id: $id) {
      id
      message
      userId
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements(
    $limit: Int
    $offset: Int
    $orderBy: String
    $orderCol: String
  ) {
    announcements(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderCol: $orderCol
    ) {
      id
      message
      userId
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      image
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_WITH_APPOINTMENTS = gql`
  query GetUserWithAppointments(
    $id: Int!
    $orderBy: String
    $orderCol: String
  ) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      image
      role
      createdAt
      updatedAt
    }
    appointments(userId: $id, orderBy: $orderBy, orderCol: $orderCol) {
      id
      name
      description
      color
      endDate
      startDate
      ownerId
      approverId
      createdAt
      updatedAt
      isApproved
      owner {
        id
        firstName
        lastName
      }
      approver {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      image
      role
      createdAt
      updatedAt
    }
  }
`

export const USER_SEARCH = gql`
  query UserSearch($keyword: String!) {
    userSearch(keyword: $keyword) {
      id
      firstName
      lastName
      email
      image
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_CHATS = gql`
  query GetChats(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: String
    $orderCol: String
  ) {
    chats(
      limit: $limit
      offset: $offset
      userId: $userId
      orderBy: $orderBy
      orderCol: $orderCol
    ) {
      id
      message
      createdAt
      senderId
      sender {
        id
        email
        lastName
        firstName
      }
      receiverId
      receiver {
        id
        email
        lastName
        firstName
      }
    }
  }
`

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: Int) {
    notifications(userId: $userId) {
      id
      message
      link
      isSeen
      userId
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_COMMENTS = gql`
  query GetComments(
    $id: Int
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: String
    $orderCol: String
  ) {
    comments(
      id: $id
      limit: $limit
      offset: $offset
      userId: $userId
      orderBy: $orderBy
      orderCol: $orderCol
    ) {
      id
      message
      createdAt
      userId
      user {
        id
        email
        lastName
        firstName
      }
      appointmentId
    }
  }
`

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: String
    $orderCol: String
  ) {
    appointments(
      limit: $limit
      offset: $offset
      userId: $userId
      orderBy: $orderBy
      orderCol: $orderCol
    ) {
      id
      name
      description
      color
      endDate
      startDate
      ownerId
      approverId
      createdAt
      updatedAt
      isApproved
      owner {
        id
        firstName
        lastName
      }
      approver {
        id
        firstName
        lastName
      }
    }
    notificationCount(userId: $userId)
    announcements(limit: $limit, offset: $offset) {
      id
      message
      userId
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`
