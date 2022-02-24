import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from '@/styles/shared.module.css'

export const ComposeMessageForm = ({ saveMessage }) => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		saveMessage({ email: email.trim(), message: message.trim() })
		setMessage('')
		setEmail('')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-2" controlId="formBasicEmail">
				<Form.Control
					type="email"
					value={email}
					required={true}
					placeholder="Email address"
					onChange={(el) => setEmail(el.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-2" controlId="formBasicEmail">
				<Form.Control
					rows={3}
					required
					as="textarea"
					value={message}
					placeholder="Compose a new message..."
					onChange={(el) => setMessage(el.target.value)}
				/>
			</Form.Group>
			<Button variant="secondary" type="submit">
				Submit
			</Button>
		</Form>
	)
}

export const ConversationBox = ({ chats, state, saveMessage, currentChat }) => {
	const [message, setMessage] = useState('')
	const [reversedChats, setReversedChats] = useState([])

	const person =
		currentChat.senderId == state?.user?.id
			? currentChat.receiver
			: currentChat.sender

	useEffect(() => {
		let items = [] // FIXME
		chats?.map((chat) => items.push(chat))
		setReversedChats(items?.reverse())

		setTimeout(() => {
			const chatBox = document.getElementById('chat-box')
			if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
		}, 1000)
	}, [chats])

	const handleSubmit = (event) => {
		event.preventDefault()
		saveMessage({ email: person?.email, message: message.trim() })
		setMessage('')
	}

	return (
		<>
			<div id="chat-box" className={styles.chatBox + ' rounded shadow-sm'}>
				{reversedChats.map((a, id) => {
					if (
						(person?.id == a.senderId && person?.id != a.receiverId) ||
						(person?.id == a.receiverId && person?.id != a.senderId)
					)
						return (
							<div
								key={id}
								className={
									'bg-white w-75 m-2 px-2 py-1 rounded' +
									(person?.id == a.receiverId && ' ms-auto')
								}
							>
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
