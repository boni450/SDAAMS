import { useState, useEffect } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

const EditAppointmentModal = ({
  next,
  month,
  toggle,
  visible,
  previous,
  appointment,
  monthDifference,
  updateAppointment,
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

  useEffect(() => {
    let a = new Date()
    let b = new Date()
    a.setTime(appointment?.startDate)
    b.setTime(appointment?.endDate)

    setEndDay(b.getDate())
    setEndHour(b.getHours())
    setEndMinute(b.getMinutes())
    setStartDay(a.getDate())
    setStartHour(a.getHours())
    setStartMinute(a.getMinutes())
    setName(appointment?.name)
    setColor(appointment?.color)
    setDescription(appointment?.description)
  }, [appointment])

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

    updateAppointment({
      color,
      name: name?.trim(),
      end: a.toISOString(),
      start: b.toISOString(),
      description: description?.trim(),
      id: Number.parseInt(appointment?.id),
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
        <Modal.Title>Edit Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label className="fw-lighter">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  required={true}
                  placeholder="Name"
                  className="mb-2"
                  onChange={(el) => setName(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="color">
                <Form.Label className="fw-lighter">Color</Form.Label>
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
              </Form.Group>
            </Col>
            <Col md={9}>
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
            <Col md={4}>
              <Form.Group controlId="start-day">
                <Form.Label className="fw-lighter">Start Day</Form.Label>
                <Form.Control
                  min="1"
                  type="number"
                  value={startDay}
                  required={true}
                  className="mb-2"
                  placeholder="Start"
                  max={month.lastDay.getDate()}
                  onChange={(el) => setStartDay(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="start-hour">
                <Form.Label className="fw-lighter">Hour</Form.Label>
                <Form.Control
                  min="0"
                  max="24"
                  type="number"
                  placeholder="Hour"
                  value={startHour}
                  className="mb-2"
                  onChange={(el) => setStartHour(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="start-minute">
                <Form.Label className="fw-lighter">Minute</Form.Label>
                <Form.Control
                  min="0"
                  max="60"
                  type="number"
                  placeholder="Min"
                  value={startMinute}
                  className="mb-2"
                  onChange={(el) => setStartMinute(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="end-day">
                <Form.Label className="fw-lighter">Stop Day</Form.Label>
                <Form.Control
                  value={endDay}
                  type="number"
                  required={true}
                  className="mb-2"
                  min={startDay || 1}
                  placeholder="End"
                  max={month.lastDay.getDate()}
                  onChange={(el) => setEndDay(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="end-hour">
                <Form.Label className="fw-lighter">Hour</Form.Label>
                <Form.Control
                  min="0"
                  max="24"
                  type="number"
                  placeholder="Hour"
                  value={endHour}
                  className="mb-2"
                  onChange={(el) => setEndHour(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="start-minute">
                <Form.Label className="fw-lighter">Minute</Form.Label>
                <Form.Control
                  min="0"
                  max="24"
                  type="number"
                  placeholder="Min"
                  value={endMinute}
                  className="mb-2"
                  onChange={(el) => setEndMinute(el.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label className="fw-lighter">Description</Form.Label>
                <Form.Control
                  rows={3}
                  as="textarea"
                  className="mb-2"
                  value={description}
                  placeholder="Description"
                  onChange={(el) => setDescription(el.target.value)}
                />
              </Form.Group>
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
