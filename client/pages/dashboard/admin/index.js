import Loader from '@/components/loader'
import AdminLayout from '@/layouts/admin'
import { useQuery } from '@apollo/client'
import { Card, Row, Col } from 'react-bootstrap'
import { ANALYTICS } from '@/lib/graphql/queries'
import {
	Line,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	LineChart,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts'

const AdminArea = () => {
	const { loading, data } = useQuery(ANALYTICS, {
		fetchPolicy: 'no-cache',
	})
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
								Approved Appointments
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
					<Col md={12}>
						<ResponsiveContainer width="100%" height={500} className="my-4">
							<LineChart
								width={500}
								height={500}
								data={data?.users}
								margin={{
									top: 5,
									right: 20,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="comments"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
								/>
								<Line type="monotone" dataKey="appointments" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</Col>
				</Row>
			</AdminLayout>
		)
	return <>loading...</>
}

export default AdminArea
