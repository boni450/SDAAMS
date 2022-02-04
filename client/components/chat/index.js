import { Context } from '@/lib/context'
import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import { ADD_CHAT } from '@/lib/graphql/mutations'
import { ComposeMessageForm, ConversationBox } from '@/components/chat/add'
import {
	Nav,
	Tab,
	Col,
	Row,
	Alert,
	Badge,
	Button,
	ListGroup,
} from 'react-bootstrap'

const ChatBox = ({ data, refetch }) => {
	let contacts = []
	const { state } = useContext(Context)
	const [key, setKey] = useState('1')
	const [alert, setAlert] = useState('')
	const [currentChat, setCurrentChat] = useState({})
	const [attemptSavingChat, saveChatMutation] = useMutation(ADD_CHAT, {
		errorPolicy: 'all',
		onCompleted: (data) => {
			if (data?.addChat) {
				setAlert('')
				console.log(data?.addChat)
			} else setAlert('Email not found')
		},
	})

	const saveMessage = ({ email, message }) => {
		attemptSavingChat({
			variables: { email, message, senderId: state?.user?.id },
		})
	}

	return (
		<Tab.Container
			activeKey={key}
			id="chat-tab-container"
			onSelect={(k) => setKey(k)}
		>
			<Nav variant="pills" className="mb-2">
				<Nav.Item>
					<Nav.Link eventKey="1">Chats</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="2">Compose</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={() => refetch()}>Refresh</Nav.Link>
				</Nav.Item>
			</Nav>
			{alert && <Alert variant="warning">{alert}</Alert>}
			<Tab.Content>
				<Tab.Pane eventKey="1">
					<ListGroup className="shadow-sm">
						{data.map((a, id) => {
							if (
								!contacts.includes(`${a.senderId}-${a.receiverId}`) &&
								!contacts.includes(`${a.receiverId}-${a.senderId}`)
							) {
								contacts.push(`${a.senderId}-${a.receiverId}`)

								let d = new Date()
								d.setTime(a?.createdAt)

								return (
									<ListGroup.Item
										action
										key={id}
										onClick={() => {
											setKey('3')
											setCurrentChat(a)
										}}
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">
												{a.sender.firstName} {a.sender.lastName} &rarr;{' '}
												{a.receiver.firstName} {a.receiver.lastName}
											</div>
											{a.message}
										</div>
										<Badge bg="light" text="dark" pill>
											{d.toDateString()} at {d.toLocaleTimeString()}
										</Badge>
									</ListGroup.Item>
								)
							}
						})}
					</ListGroup>
				</Tab.Pane>
				<Tab.Pane eventKey="2">
					<ComposeMessageForm saveMessage={saveMessage} />
				</Tab.Pane>
				<Tab.Pane eventKey="3">
					<ConversationBox
						chats={data}
						saveMessage={saveMessage}
						currentChat={currentChat}
					/>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	)
}

export default ChatBox
