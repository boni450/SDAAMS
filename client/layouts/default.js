import Head from 'next/head'
import jwt_decode from 'jwt-decode'
import { Context } from '@/lib/context'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useContext } from 'react'

const Default = ({ children, title, fluid, notifications }) => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    if (!state?.user?.id && localStorage.getItem('payload')) {
      const token = jwt_decode(localStorage.getItem('payload'))
      // FIXME: check token?.exp date
      dispatch({
        type: 'AUTHENTICATE',
        payload: {
          id: token?.data?.id,
          role: token?.data?.role,
          email: token?.data?.email,
          image: token?.data?.image,
          lastName: token?.data?.lastName,
          firstName: token?.data?.firstName,
        },
      })
    }
  }, [state])

  return (
    <>
      <Head>
        <title>{title || process.env.TITLE}</title>
        <meta name="description" content={process.env.DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header fluid={fluid} notifications={notifications} />
      <main>{children}</main>
      {!fluid && <Footer />}
    </>
  )
}

export default Default
