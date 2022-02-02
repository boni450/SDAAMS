import { useState } from 'react'
import { format } from 'date-fns'
import { Alert, Modal, Button, Row, Col, Form } from 'react-bootstrap'

const EditAppointmentModal = ({
	month,
	toggle,
	visible,
	appointment,
	updateAppointment,
}) => {
	let a = new Date()
	let b = new Date()
	a.setTime(appointment?.startDate)
	b.setTime(appointment?.endDate)

	const [end, setEnd] = useState('')
	const [name, setName] = useState('')
	const [start, setStart] = useState('')
	const [color, setColor] = useState('')
	const [description, setDescription] = useState('')
	const colors = [
		{ name: 'green', value: 'success' },
		{ name: 'blue', value: 'info' },
		{ name: 'yellow', value: 'warning' },
		{ name: 'red', value: 'danger' },
		{ name: 'black', value: 'secondary' },
	]

	const handleSubmit = (event) => {
		event.preventDefault()
		// FIXME: fix this
		console.log({
			color,
			name: name?.trim(),
			description: description?.trim(),
			id: Number.parseInt(appointment?.id),
			end: format(new Date().setDate(end), 'yyyy-MM-dd'),
			start: format(new Date().setDate(start), 'yyyy-MM-dd'),
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
				<Modal.Title>Edit Appointment</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Row className="justify-content-center">
						<Col md={6}>
							<Form.Control
								type="text"
								required={true}
								placeholder="Name"
								className="mb-2"
								defaultValue={appointment?.name}
								onChange={(el) => setName(el.target.value)}
							/>
						</Col>
						<Col md={6}>
							<Form.Select
								required={true}
								className="mb-2"
								defaultValue={appointment?.color}
								onChange={(el) => setColor(el.target.value)}
							>
								<option value="">. . . choose color . . .</option>
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
								defaultValue={a.getDate()}
								className="mb-2"
								max={month.lastDay.getDate()}
								onChange={(el) => setStart(el.target.value)}
							/>
						</Col>
						<Col md={3}>
							<Form.Control
								min={start || 1}
								type="number"
								required={true}
								placeholder="End"
								defaultValue={b.getDate()}
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
								defaultValue={appointment?.description}
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

export default EditAppointmentModal
