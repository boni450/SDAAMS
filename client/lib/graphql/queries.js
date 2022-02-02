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
	query GetAppointments {
		appointments {
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
