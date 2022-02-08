import { Container } from 'react-bootstrap'
import DefaultLayout from '@/layouts/default'

const Help = () => {
  return (
    <DefaultLayout title="Help - SDAAMS">
      <Container>
        <section className="border-5 border-bottom border-info rounded rounded-3 bg-light text-center shadow-sm p-3">
          <h1>Help</h1>
          <p>Get started, frequently asked questions, get involved...</p>
        </section>
        <section className="mt-3">
          <h3>Get Started</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            maxime doloribus iure repellat laborum velit reprehenderit ea dolor
            ipsum! Delectus qui sed ratione sint totam perferendis esse
            laudantium numquam architecto?
          </p>
          <h3>Frequently Asked Questions</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quae
            ipsum, animi nam asperiores quis enim non nisi, officiis labore quam
            illo, velit, provident nesciunt aliquam accusantium tempora
            laboriosam voluptates?
          </p>
        </section>
      </Container>
    </DefaultLayout>
  )
}

export default Help
