import { format } from 'date-fns' // FIXME: replace
import { useState, useEffect } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

const EditAppointmentModal = ({
  month,
  toggle,
  visible,
  appointment,
  monthDifference,
  updateAppointment,
}) => {
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

  useEffect(() => {
    let a = new Date()
    let b = new Date()
    a.setTime(appointment?.startDate)
    b.setTime(appointment?.endDate)

    setEnd(b.getDate())
    setStart(a.getDate())
    setName(appointment?.name)
    setColor(appointment?.color)
    setDescription(appointment?.description)
  }, [appointment])

  const handleSubmit = (event) => {
    event.preventDefault()
    let a = new Date()
    let b = new Date()

    a.setMonth(a.getMonth() + monthDifference)
    b.setMonth(b.getMonth() + monthDifference)

    updateAppointment({
      color,
      name: name?.trim(),
      description: description?.trim(),
      id: Number.parseInt(appointment?.id),
      end: format(a.setDate(end), 'yyyy-MM-dd'),
      start: format(b.setDate(start), 'yyyy-MM-dd'),
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
                value={name}
                required={true}
                placeholder="Name"
                className="mb-2"
                onChange={(el) => setName(el.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select
                value={color}
                required={true}
                className="mb-2"
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
                value={start}
                required={true}
                className="mb-2"
                placeholder="Start"
                max={month.lastDay.getDate()}
                onChange={(el) => setStart(el.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                value={end}
                type="number"
                required={true}
                className="mb-2"
                min={start || 1}
                placeholder="End"
                max={month.lastDay.getDate()}
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
                rows={3}
                as="textarea"
                className="mb-2"
                value={description}
                placeholder="Description"
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
