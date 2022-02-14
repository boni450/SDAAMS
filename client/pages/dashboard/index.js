import { useContext } from 'react'
import { Context } from '@/lib/context'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import { Tab, Tabs, Container } from 'react-bootstrap'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'
import AppointmentTable from '@/components/appointment/table'

const Dashboard = () => {
	const { state } = useContext(Context)
	const { loading, data, refetch } = useQuery(GET_APPOINTMENTS, {
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
					<Tabs
						defaultActiveKey="1"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab eventKey="1" title="Calendar">
							<Calendar
								state={state}
								refetch={refetch}
								data={data?.appointments || []}
							/>
						</Tab>
						<Tab eventKey="2" title="My Activities">
							<AppointmentTable
								state={state}
								appointments={data?.appointments || []}
							/>
						</Tab>
						<Tab eventKey="3" title="Request Appointment">
							2
						</Tab>
					</Tabs>
				</Container>
			</DefaultLayout>
		)
}

export default Dashboard
