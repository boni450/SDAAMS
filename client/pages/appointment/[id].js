import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '@/lib/context'
import { useRouter } from 'next/router'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import Calendar from '@/components/calendar'
import DefaultLayout from '@/layouts/default'
import { Container, Tabs, Tab } from 'react-bootstrap'
import { GET_APPOINTMENT } from '@/lib/graphql/queries'
import AppointmentTable from '@/components/appointment-table'

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
					<Tabs
						defaultActiveKey="1"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab eventKey="1" title="Activity / Appointment">
							<AppointmentTable
								state={state}
								refetch={refetch}
								appointments={[data?.appointment] || []}
							/>
						</Tab>
						<Tab eventKey="2" title="Calendar">
							<Calendar
								state={state}
								refetch={refetch}
								profile={state?.user}
								data={[data?.appointment] || []}
							/>
						</Tab>
					</Tabs>
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
