import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import { Container } from 'react-bootstrap'
import DefaultLayout from '@/layouts/default'
import { GET_APPOINTMENT } from '@/lib/graphql/queries'

const Appointment = () => {
	const router = useRouter()
	const { state } = useContext(Context)
	const { data, refetch } = useQuery(GET_APPOINTMENT, {
		variables: { id: Number.parseInt(router.query.id) || 0 },
		fetchPolicy: 'network-only',
	})

	if (data?.appointment) {
		let a = new Date()
		let b = new Date()
		a.setTime(data?.appointment?.startDate)
		b.setTime(data?.appointment?.endDate)

		return (
			<DefaultLayout title="Appointment - SDAAMS">
				<Container>
					<h2>{data?.appointment?.name}</h2>
					<p>{data?.appointment?.description}</p>
					<Link href={'/user/' + data?.appointment?.ownerId}>
						<a>
							Author: {data?.appointment?.owner?.firstName}{' '}
							{data?.appointment?.owner?.lastName}
						</a>
					</Link>
					<br />
					Start:{' '}
					{a.toLocaleString('en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
					})}
					<br />
					Stop:{' '}
					{b.toLocaleString('en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
					})}
				</Container>
			</DefaultLayout>
		)
	} else
		return (
			<DefaultLayout title="Appointment - SDAAMS">
				<Container>
					<Loader size={8} />
				</Container>
			</DefaultLayout>
		)
}

export default Appointment
