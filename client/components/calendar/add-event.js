import { useState } from 'react'
import { Alert, Modal, Button, Row, Col, Form } from 'react-bootstrap'

const AddEventModal = ({ toggle, visible, saveEvent, month }) => {
	const [end, setEnd] = useState('')
	const [name, setName] = useState('')
	const [color, setColor] = useState('')
	const [start, setStart] = useState('')
	const [description, setDescription] = useState('')
	const colors = [
		{ name: 'green', value: 'success' },
		{ name: 'blue', value: 'info' },
		{ name: 'yellow', value: 'warning' },
		{ name: 'red', value: 'danger' },
	]

	const handleSubmit = (event) => {
		event.preventDefault()
		saveEvent({
			end,
			start,
			color,
			name: name.trim(),
			description: description.trim(),
		})
		setEnd('')
		setName('')
		setStart('')
		setColor('')
		setDescription('')
		toggle()
	}

	return (
		<Modal show={visible} onHide={toggle}>
			<Modal.Header closeButton>
				<Modal.Title>Add Event</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Row className="justify-content-center">
						<Col md={6}>
							<Form.Control
								type="text"
								required={true}
								placeholder="Event name"
								value={name}
								className="mb-2"
								onChange={(el) => setName(el.target.value)}
							/>
						</Col>
						<Col md={6}>
							<Form.Select
								required={true}
								value={color}
								className="mb-2"
								onChange={(el) => setColor(el.target.value)}
							>
								<option>. . . choose color . . .</option>
								{colors.map((item, id) => (
									<option key={id} value={item.value}>
										{item.name}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={3}>
							<Form.Control
								min="1"
								type="number"
								required={true}
								placeholder="Start"
								value={start}
								className="mb-2"
								max={month.lastDay.getDate()}
								onChange={(el) => setStart(el.target.value)}
							/>
						</Col>
						<Col md={3}>
							<Form.Control
								min={start}
								type="number"
								required={true}
								placeholder="End"
								value={end}
								max={month.lastDay.getDate()}
								className="mb-2"
								onChange={(el) => setEnd(el.target.value)}
							/>
						</Col>
						<Col md={6}>
							<span className="badge bg-light text-dark w-100 fs-5">
								{month.today.toLocaleString('default', {
									month: 'long',
									year: 'numeric',
								})}
							</span>
						</Col>
						<Col md={12}>
							<Form.Control
								as="textarea"
								rows={3}
								className="mb-2"
								placeholder="Description"
								value={description}
								onChange={(el) => setDescription(el.target.value)}
							/>
						</Col>
					</Row>
					<div className="d-grid">
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddEventModal
