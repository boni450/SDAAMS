import { Container } from 'react-bootstrap'
import DefaultLayout from '@/layouts/default'

const Contact = () => {
  return (
    <DefaultLayout title="Contact - SDAAMS">
      <Container>
        <section className="border-5 border-bottom border-info rounded rounded-3 bg-light text-center shadow-sm p-3">
          <h1>Contact Us</h1>
          <p>Get in touch, we would like to hear from you.</p>
        </section>
        <section className="mt-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            maxime doloribus iure repellat laborum velit reprehenderit ea dolor
            ipsum! Delectus qui sed ratione sint totam perferendis esse
            laudantium numquam architecto?
          </p>
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

export default Contact
