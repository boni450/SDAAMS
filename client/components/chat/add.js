import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const ComposeMessageForm = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(email, message)
		setEmail('')
		setMessage('')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-2" controlId="formBasicEmail">
				<Form.Control
					type="email"
					required={true}
					placeholder="Email address"
					value={email}
					onChange={(el) => setEmail(el.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-2" controlId="formBasicEmail">
				<Form.Control
					as="textarea"
					rows={3}
					required
					placeholder="Compose a new message..."
					value={message}
					onChange={(el) => setMessage(el.target.value)}
				/>
			</Form.Group>
			<Button variant="secondary" type="submit">
				Submit
			</Button>
		</Form>
	)
}

export default ComposeMessageForm
