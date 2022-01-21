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

export const ADD_APPOINTMENT = gql`
	mutation AddAppointment(
		$name: String!
		$description: String
		$endDate: String!
		$startDate: String!
		$color: String
		$ownerId: Int!
		$approverId: Int
	) {
		addAppointment(
			name: $name
			description: $description
			endDate: $endDate
			startDate: $startDate
			color: $color
			ownerId: $ownerId
			approverId: $approverId
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