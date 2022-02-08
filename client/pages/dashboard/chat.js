import { useContext } from 'react'
import { Context } from '@/lib/context'
import ChatBox from '@/components/chat'
import Loader from '@/components/loader'
import { useQuery } from '@apollo/client'
import DefaultLayout from '@/layouts/default'
import { GET_CHATS } from '@/lib/graphql/queries'
import { Container, Row, Col } from 'react-bootstrap'

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
							<ChatBox
								state={state}
								refetch={refetch}
								data={data?.chats || []}
							/>
						</Col>
					</Row>
				</Container>
			</DefaultLayout>
		)
}

export default Chat
