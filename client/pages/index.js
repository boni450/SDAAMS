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
                Lorem ipsum dolor sit, amet consectetur, adipisicing elit. Esse
                doloribus hic ipsum fugit obcaecati eius odio, ipsam libero
                atque vitae nihil voluptatibus, quae distinctio quos. Modi, iure
                voluptatem similique eius.
              </p>
            </section>
          </Col>
          <Col md={3} sm={6}>
            <Image src="/img/calendar.svg" height={300} width={300} />
          </Col>
          <Col md={3} sm={6} className="mt-4">
            <h5>Schedule Appointments</h5>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing, elit.
              Aspernatur, iste. Aspernatur vitae dolorem ab animi similique,
              eligendi dolores. Perspiciatis animi at magnam recusandae ducimus,
              autem enim tempore molestias?
            </p>
          </Col>
          <Col md={3} sm={6}>
            <Image src="/img/meeting.svg" height={300} width={300} />
          </Col>
          <Col md={3} sm={6} className="mt-4">
            <h5>Attend Events</h5>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aperiam pariatur repellat officia ad quisquam fugit facere quae.
              Aut, placeat, nihil. Expedita ut illo doloribus repellendus
              facilis molestiae ullam magnam!
            </p>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Home
