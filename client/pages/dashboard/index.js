import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'
import Loader from '@/components/loader'

const Dashboard = () => {
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
					<Calendar data={data?.appointments} />
				</Container>
			</DefaultLayout>
		)
}

export default Dashboard
