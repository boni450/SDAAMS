import Head from 'next/head'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useContext } from 'react'

const Default = ({ children, title }) => {
	const router = useRouter()
	const { state, dispatch } = useContext(Context)

	useEffect(() => {
		if (!state?.user?.firstName && localStorage.getItem('payload'))
			dispatch({ type: 'LOGIN', payload: localStorage.getItem('payload') })
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
