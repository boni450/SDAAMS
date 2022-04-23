import { useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

const AddAppointmentModal = ({
  next,
  month,
  toggle,
  visible,
  previous,
  saveAppointment,
  monthDifference,
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [endDay, setEndDay] = useState('')
  const [endHour, setEndHour] = useState('')
  const [endMinute, setEndMinute] = useState('')
  const [startDay, setStartDay] = useState('')
  const [startHour, setStartHour] = useState('')
  const [startMinute, setStartMinute] = useState('')
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
    let a = new Date()
    let b = new Date()

    a.setMonth(a.getMonth() + monthDifference)
    a.setDate(endDay)
    a.setHours(endHour)
    a.setMinutes(endMinute)

    b.setMonth(b.getMonth() + monthDifference)
    b.setDate(startDay)
    b.setHours(startHour)
    b.setMinutes(startMinute)

    saveAppointment({
      color,
      name: name.trim(),
      description: description.trim(),
      end: a.toISOString(),
      start: b.toISOString(),
    })
    setEndDay('')
    setEndHour('')
    setEndMinute('')
    setName('')
    setStartDay('')
    setStartHour('')
    setStartMinute('')
    setColor('')
    setDescription('')
    toggle()
  }

  const nextMonth = (event) => {
    event.preventDefault()
    next()
  }

  const previousMonth = (event) => {
    event.preventDefault()
    previous()
  }

  return (
    <Modal show={visible} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Control
                type="text"
                required={true}
                placeholder="Name"
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
                <option value="">. . . choose color . . .</option>
                {colors.map((item, id) => (
                  <option key={id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={8}>
              <span className="badge bg-light text-dark w-100 fs-4 mb-2">
                {month.today.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </Col>
            <Col md={3}>
              <button
                disabled='true'
                title="next month"
                data-bs-toggle="tooltip"
                className="btn btn-secondary rounded-pill mx-1"
              >
                &#8647;
              </button>
              <button
                title="previous month"
                data-bs-toggle="tooltip"
                className="btn btn-secondary rounded-pill mx-1"
                onClick={nextMonth}
              >
                &#8649;
              </button>
            </Col>
            <Col md={2}>
              <h5 className="text-center fw-normal mt-2">Start</h5>
            </Col>
            <Col md={3}>
              <Form.Control
                min="1"
                type="number"
                required={true}
                placeholder="Day"
                value={startDay}
                className="mb-2"
                max={month.lastDay.getDate()}
                onChange={(el) => setStartDay(el.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                min="0"
                max="24"
                type="number"
                placeholder="Hour"
                value={startHour}
                className="mb-2"
                onChange={(el) => setStartHour(el.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                min="0"
                max="60"
                type="number"
                placeholder="Min"
                value={startMinute}
                className="mb-2"
                onChange={(el) => setStartMinute(el.target.value)}
              />
            </Col>
            <Col md={2}>
              <h5 className="text-center fw-normal mt-1">Stop</h5>
            </Col>
            <Col md={3}>
              <Form.Control
                min={startDay}
                type="number"
                required={true}
                placeholder="Day"
                value={endDay}
                max={month.lastDay.getDate()}
                className="mb-2"
                onChange={(el) => setEndDay(el.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                min="0"
                max="24"
                type="number"
                placeholder="Hour"
                value={endHour}
                className="mb-2"
                onChange={(el) => setEndHour(el.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                min="0"
                max="24"
                type="number"
                placeholder="Min"
                value={endMinute}
                className="mb-2"
                onChange={(el) => setEndMinute(el.target.value)}
              />
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

export default AddAppointmentModal
