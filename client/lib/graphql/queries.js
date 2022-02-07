import { gql } from '@apollo/client'

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

export const LOGIN = gql`
	query Login($email: String!, $password: String!) {
		login(email: $email, password: $password)
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
			owner {
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
			owner {
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
	query GetUserWithAppointments($id: Int!) {
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
		appointments(userId: $id) {
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
