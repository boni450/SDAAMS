import Head from 'next/head'
import Footer from '@/components/footer'
import Header from '@/components/header'

const Default = ({ children, title }) => {
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
