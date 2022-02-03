import { Context } from '@/lib/context'
import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import { Nav, Tab, Row, Col, ListGroup, Badge } from 'react-bootstrap'
import ComposeMessageForm from '@/components/chat/add'

const ChatBox = ({ data }) => {
	return (
		<>
			<Tab.Container defaultActiveKey="1">
				<Nav variant="pills" className="mb-2">
					<Nav.Item>
						<Nav.Link eventKey="1">Chats</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="2">Compose</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => alert('refresh')}>Refresh</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="1">
						<ListGroup>
							<ListGroup.Item
								action
								className="d-flex justify-content-between align-items-start"
							>
								<div className="ms-2 me-auto">
									<div className="fw-bold">Jane Doe</div>u ugly, ur mama say u
									ugly
								</div>
								<Badge variant="primary" pill>
									14
								</Badge>
							</ListGroup.Item>
							<ListGroup.Item
								action
								className="d-flex justify-content-between align-items-start"
							>
								<div className="ms-2 me-auto">
									<div className="fw-bold">John Doe</div>
									Get a life, stop playing video games
								</div>
								<Badge variant="primary" pill>
									14
								</Badge>
							</ListGroup.Item>
						</ListGroup>
					</Tab.Pane>
					<Tab.Pane eventKey="2">
						<ComposeMessageForm />
					</Tab.Pane>
					<Tab.Pane eventKey="3">3</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</>
	)
}

export default ChatBox
