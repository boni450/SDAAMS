import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { Container } from 'react-bootstrap'

const Dashboard = () => {
	return (
		<DefaultLayout title="Dashboard - SDAAMS">
			<Container fluid>
				<Calendar />
			</Container>
		</DefaultLayout>
	)
}

export default Dashboard
