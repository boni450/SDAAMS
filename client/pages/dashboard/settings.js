import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { setCookie } from '@/lib/cookie'
import DefaultLayout from '@/layouts/default'
import { GET_USER } from '@/lib/graphql/queries'
import { UPDATE_USER } from '@/lib/graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import { Container, Alert, Card, Form, Button, Row, Col } from 'react-bootstrap'

const Settings = () => {
	const { state } = useContext(Context)
	const [alert, setAlert] = useState('')
	const [email, setEmail] = useState('')
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const { data, loading } = useQuery(GET_USER, {
		variables: { id: Number.parseInt(state?.user?.id) || 0 },
	})
	const [attemptUpdatingUser, updateUserMutation] = useMutation(UPDATE_USER, {
		errorPolicy: 'all',
		onCompleted: (data) => {
			if (data?.updateUser) {
				setCookie('payload', data?.updateUser)
				localStorage.setItem('payload', data?.updateUser)
				window.location.reload()
			}
		},
	})

	useEffect(() => {
		if (data?.user?.id) {
			setEmail(data?.user?.email)
			setFirstName(data?.user?.firstName)
			setLastName(data?.user?.lastName)
		}
	}, [data?.user])

	const handleSubmit = (event) => {
		event.preventDefault()
		attemptUpdatingUser({
			variables: {
				id: Number.parseInt(state?.user?.id),
				firstName,
				lastName,
				email,
			},
		})
	}

	if (loading)
		return (
			<DefaultLayout title="Settings - SDAAMS">
				<Container>
					<Loader size={5} />
				</Container>
			</DefaultLayout>
		)
	if (data)
		return (
			<DefaultLayout title="Settings - SDAAMS">
				<Container>
					{alert && <Alert variant="warning">{alert}</Alert>}
					<Card className="shadow-sm my-3">
						<Card.Header>User Settings</Card.Header>
						<Card.Body>
							<Form onSubmit={handleSubmit}>
								<Row className="justify-content-center">
									<Col md={4}>
										<Form.Group className="mb-3" controlId="formBasicFirstName">
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type="text"
												required={true}
												placeholder="Enter first name"
												value={firstName}
												onChange={(el) => setFirstName(el.target.value)}
											/>
										</Form.Group>
									</Col>
									<Col md={4}>
										<Form.Group className="mb-3" controlId="formBasicLastName">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type="text"
												required={true}
												placeholder="Enter last name"
												value={lastName}
												onChange={(el) => setLastName(el.target.value)}
											/>
										</Form.Group>
									</Col>
									<Col md={4}>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Email address</Form.Label>
											<Form.Control
												type="email"
												required={true}
												placeholder="Enter email"
												value={email}
												onChange={(el) => setEmail(el.target.value)}
											/>
										</Form.Group>
									</Col>
								</Row>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Container>
			</DefaultLayout>
		)

	return <>loading...</>
}

export default Settings
