import { Modal, Button, Badge } from 'react-bootstrap'
import Comment from '@/components/comment'

const ShowAppointmentModal = ({
  visible,
  appointment,
  update,
  toggle,
  erase,
  state,
}) => {
  let a = new Date()
  let b = new Date()
  a.setTime(appointment?.startDate)
  b.setTime(appointment?.endDate)

  return (
    <Modal size="lg" show={visible} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>{appointment?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{appointment?.description}</p>
        <h5>
          <Badge bg={appointment?.color}>
            {appointment?.owner?.firstName} {appointment?.owner?.lastName}
          </Badge>{' '}
          <Badge bg={appointment?.color}>
            Start:{' '}
            {a.toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Badge>{' '}
          <Badge bg={appointment?.color}>
            Stop:{' '}
            {b.toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Badge>
        </h5>
        <Comment state={state} appointment={appointment} />
      </Modal.Body>
      {state?.user?.id && state?.user?.id === appointment?.ownerId && (
        <Modal.Footer>
          <Button variant="success" onClick={update}>
            Edit
          </Button>
          <Button variant="warning" onClick={erase}>
            Delete
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default ShowAppointmentModal
