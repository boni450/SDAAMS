import AdminLayout from '@/layouts/admin'
import { Card, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { ANALYTICS } from '@/lib/graphql/queries'
import Loader from '@/components/loader'

const AdminArea = () => {
	const { loading, data } = useQuery(ANALYTICS)

	if (loading)
		return (
			<AdminLayout title="Admin Area - SDAAMS">
				<Loader size={5} />
			</AdminLayout>
		)
	if (data)
		return (
			<AdminLayout title="Admin Area - SDAAMS">
				<h2>Admin Area</h2>
				<Row className="justify-content-center">
					<Col md={3}>
						<Card bg="light" className="shadow-sm">
							<Card.Body>
								<h1>{data?.analytics?.users}</h1>
								Registered users
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card bg="light" className="shadow-sm">
							<Card.Body>
								<h1>{data?.analytics?.appointments}</h1>
								Appointments
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card bg="light" className="shadow-sm">
							<Card.Body>
								<h1>{data?.analytics?.bookings}</h1>
								Bookings
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card bg="light" className="shadow-sm">
							<Card.Body>
								<h1>{data?.analytics?.comments}</h1>
								Comments
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</AdminLayout>
		)
}

export default AdminArea
