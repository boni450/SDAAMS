import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ShowEventModal = ({ visible, event, toggle, erase }) => {
	return (
		<Modal show={visible} onHide={toggle}>
			<Modal.Header closeButton>
				<Modal.Title>{event?.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{event?.description}</Modal.Body>
			<Modal.Footer>
				<Button variant="primary">Edit</Button>
				<Button variant="warning" onClick={erase}>
					Delete
				</Button>
				<Button variant="secondary" onClick={toggle}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ShowEventModal
