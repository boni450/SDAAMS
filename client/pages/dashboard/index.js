import { useContext } from 'react'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import { Container } from 'react-bootstrap'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'

const Dashboard = () => {
	const { state } = useContext(Context)
	const { loading, data } = useQuery(GET_APPOINTMENTS, {
		fetchPolicy: 'network-only',
	})

	if (loading)
		return (
			<DefaultLayout title="Dashboard - SDAAMS">
				<Container>
					<Loader size={16} />
				</Container>
			</DefaultLayout>
		)
	if (data)
		return (
			<DefaultLayout title="Dashboard - SDAAMS">
				<Container>
					<Calendar state={state} data={data?.appointments} />
				</Container>
			</DefaultLayout>
		)
}

export default Dashboard
