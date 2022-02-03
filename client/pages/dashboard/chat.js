import { useContext } from 'react'
import { Context } from '@/lib/context'
import ChatBox from '@/components/chat'
import DefaultLayout from '@/layouts/default'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GET_CHATS } from '@/lib/graphql/queries'
import Loader from '@/components/loader'

const Chat = () => {
	const { state } = useContext(Context)
	const { loading, data, refetch } = useQuery(GET_CHATS, {
		variables: { orderBy: 'DESC', userId: state?.user?.id },
	})

	if (loading)
		return (
			<DefaultLayout title="Chat - SDAAMS">
				<Container>
					<Row className="justify-content-center">
						<Col md={9}>
							<Loader size={5} />
						</Col>
					</Row>
				</Container>
			</DefaultLayout>
		)
	if (data)
		return (
			<DefaultLayout title="Chat - SDAAMS">
				<Container>
					<Row className="justify-content-center">
						<Col md={9}>
							<ChatBox data={data?.chats} refetch={refetch} />
						</Col>
					</Row>
				</Container>
			</DefaultLayout>
		)
}

export default Chat
