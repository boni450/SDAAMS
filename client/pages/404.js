import Link from 'next/link'
import Head from 'next/head'
import { Container } from 'react-bootstrap'

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>404 - {process.env.TITLE}</title>
        <meta name="description" content="Page not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="text-center vh-100 p-5">
        <section className="border-5 border-bottom border-danger rounded rounded-3 bg-light text-center shadow-sm p-3 m-5">
          <h1>404</h1>
          <p className="text-muted">Page not found</p>
          <Link href="/">
            <a className="btn btn-sm btn-secondary rounded-pill">
              &larr; back home
            </a>
          </Link>
        </section>
      </Container>
    </>
  )
}

export default PageNotFound
