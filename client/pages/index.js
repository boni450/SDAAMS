import Image from 'next/image'
import DefaultLayout from '@/layouts/default'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col md={12}>
            <section className="border-5 border-start border-info rounded rounded-3 bg-light shadow-sm p-3">
              <h3>Welcome to {process.env.TITLE}</h3>
              <p>
                Smart Daily Actvities Planning and Appointment Management System
              </p>
            </section>
          </Col>
          <Col md={2} sm={4}>
            <Image src="/img/calendar.svg" height={300} width={300} />
          </Col>
          <Col md={4} sm={8} className="mt-4">
            <h5>Schedule Appointments</h5>
            <p className="text-muted">
              we understand that respect is earned, through empathy, compassion,
              and trust.
            </p>
          </Col>
          <Col md={2} sm={4}>
            <Image src="/img/meeting.svg" height={300} width={300} />
          </Col>
          <Col md={4} sm={8} className="mt-4">
            <h5>Attend Events</h5>
            <p className="text-muted">
              it was nice to meet you. i hope we can see each other sometime
              again
            </p>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Home
