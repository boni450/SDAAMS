import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from '@/styles/shared.module.css'

export const ComposeMessageForm = ({ saveMessage }) => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		saveMessage({ email: email.trim(), message: message.trim() })
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

export const ConversationBox = ({ chats, saveMessage, currentChat }) => {
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		// saveMessage({email:email.trim(), message:message.trim()})
		setMessage('')
	}

	return (
		<>
			<div className={styles.chatBox + ' rounded shadow-sm'}>
				{chats.map((a, id) => {
					if (
						a.senderId == a.receiverId &&
						currentChat.senderId == currentChat.receiverId
					)
						return (
							<div key={id} className="bg-white w-75 m-2 px-2 py-1 rounded">
								<div className="fw-bold">
									{a.sender.firstName} {a.sender.lastName} &rarr;{' '}
									{a.receiver.firstName} {a.receiver.lastName}
								</div>
								{a.message}
							</div>
						)
				})}
			</div>
			<Form onSubmit={handleSubmit} className="mt-2">
				<Form.Group className="mb-2" controlId="formBasicEmail">
					<Form.Control
						as="textarea"
						rows={3}
						required
						placeholder="Leave a reply..."
						value={message}
						onChange={(el) => setMessage(el.target.value)}
					/>
				</Form.Group>
				<Button variant="secondary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	)
}
