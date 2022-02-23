import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register(
    $lastName: String!
    $firstName: String!
    $email: String!
    $password: String!
  ) {
    register(
      lastName: $lastName
      firstName: $firstName
      email: $email
      password: $password
    )
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: Int!
    $lastName: String
    $firstName: String
    $role: String
    $email: String
    $password: String
  ) {
    updateUser(
      id: $id
      lastName: $lastName
      firstName: $firstName
      role: $role
      email: $email
      password: $password
    )
  }
`

export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $name: String!
    $description: String
    $endDate: String!
    $startDate: String!
    $color: String
    $ownerId: Int!
    $approverId: Int
    $isApproved: Boolean
  ) {
    addAppointment(
      name: $name
      description: $description
      endDate: $endDate
      startDate: $startDate
      color: $color
      ownerId: $ownerId
      approverId: $approverId
      isApproved: $isApproved
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
      owner {
        id
        firstName
        lastName
      }
    }
  }
`

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $id: Int!
    $name: String
    $description: String
    $endDate: String
    $startDate: String
    $color: String
    $ownerId: Int
    $approverId: Int
    $isApproved: Boolean
  ) {
    updateAppointment(
      id: $id
      name: $name
      description: $description
      endDate: $endDate
      startDate: $startDate
      color: $color
      ownerId: $ownerId
      approverId: $approverId
      isApproved: $isApproved
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
      owner {
        id
        firstName
        lastName
      }
    }
  }
`

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: Int!) {
    deleteAppointment(id: $id)
  }
`

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $id: Int!
    $message: String
    $link: String
    $isSeen: Boolean
    $userId: Int
  ) {
    updateNotification(
      id: $id
      message: $message
      link: $link
      isSeen: $isSeen
      userId: $userId
    ) {
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

export const ADD_CHAT = gql`
  mutation AddChat($email: String!, $message: String!, $senderId: Int!) {
    addChat(email: $email, message: $message, senderId: $senderId) {
      id
      message
      senderId
      receiverId
    }
  }
`
