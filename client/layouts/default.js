import Head from 'next/head'
import jwt_decode from 'jwt-decode'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useContext } from 'react'

const Default = ({ children, title }) => {
	const router = useRouter()
	const { state, dispatch } = useContext(Context)

	useEffect(() => {
		if (!state?.user?.email && localStorage.getItem('payload')) {
			const token = jwt_decode(localStorage.getItem('payload'))
			//FIXME: check token?.exp date
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
	}, [])

	return (
		<>
			<Head>
				<title>{title || process.env.title}</title>
				<meta name="description" content={process.env.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default Default
