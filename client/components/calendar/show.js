import { useState } from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'

const ShowAppointmentModal = ({
	visible,
	appointment,
	update,
	toggle,
	erase,
}) => {
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
				<h5>
					<Badge bg={appointment?.color}>
						{appointment?.owner?.firstName} {appointment?.owner?.lastName}
					</Badge>{' '}
					<Badge bg={appointment?.color}>Start: {a.toDateString()}</Badge>{' '}
					<Badge bg={appointment?.color}>Stop: {b.toDateString()}</Badge>
				</h5>
				<p className="mb-0">{appointment?.description}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={update}>
					Edit
				</Button>
				<Button variant="warning" onClick={erase}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ShowAppointmentModal
