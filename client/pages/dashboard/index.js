import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { Container } from 'react-bootstrap'

const Dashboard = () => {
	return (
		<DefaultLayout>
			<Container fluid>
				<Calendar />
			</Container>
		</DefaultLayout>
	)
}

export default Dashboard
