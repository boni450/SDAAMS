import { useState } from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'

const ShowAppointmentModal = ({ visible, appointment, toggle, erase }) => {
	let a = new Date()
	let b = new Date()
	a.setTime(appointment?.startDate)
	b.setTime(appointment?.endDate)

	return (
		<Modal show={visible} onHide={toggle}>
			<Modal.Header closeButton>
				<Modal.Title>{appointment?.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{appointment?.description}</p>
				<h5 className="mb-0">
					<Badge bg="secondary">
						{appointment?.owner?.firstName} {appointment?.owner?.lastName}
					</Badge>{' '}
					<Badge bg="secondary">Start: {a.toDateString()}</Badge>{' '}
					<Badge bg="secondary">Stop: {b.toDateString()}</Badge>
				</h5>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary">Edit</Button>
				<Button variant="warning" onClick={erase}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ShowAppointmentModal
