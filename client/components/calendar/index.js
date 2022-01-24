import { format } from 'date-fns'
import { Context } from '@/lib/context'
import { useMutation } from '@apollo/client'
import styles from '@/styles/shared.module.css'
import { useState, useEffect, useContext } from 'react'
import { ADD_APPOINTMENT } from '@/lib/graphql/mutations'
import AddEventModal from '@/components/calendar/add-event'
import ShowEventModal from '@/components/calendar/show-event'
import { Container, Table } from 'react-bootstrap'

const Calendar = () => {
	// GRID
	const today = new Date()
	let grid = { id: 0, day: 0 }
	const monthWeeks = [0, 1, 2, 3, 4]
	const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

	// STATE
	const [events, setEvents] = useState([])
	const [currentEvent, setCurrentEvent] = useState({})
	const [month, setMonth] = useState({
		today,
		firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
		lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0),
	})
	const [showModal, setShowModal] = useState(false)
	const [showAddModal, setShowAddModal] = useState(false)

	// CONTEXT & GRAPHQL
	const { state } = useContext(Context)
	const [attemptSavingEvent, { data, loading, error }] = useMutation(
		ADD_APPOINTMENT,
		{
			errorPolicy: 'all',
			onCompleted: (data) => {
				if (data?.addAppointment) {
					console.log('Event saved ', data)
				}
			},
		}
	)

	useEffect(() => {
		setEvents([
			{
				id: 0,
				name: 'Weekend',
				description:
					'Abel Makkonen Tesfaye (born February 16, 1990), known professionally as the Weeknd, ... to avoid trademark problems with Canadian pop-rock band the Weekend.',
				start: '2022-01-28T08:00:51.948Z',
				end: '2022-01-28T08:00:51.948Z',
				color: 'warning',
			},
			{
				id: 1,
				name: 'Dentist',
				description:
					'As doctors of oral health, dentists are trained to diagnose, treat and prevent oral diseases; promote oral health; and create treatment plans to maintain or ...',
				start: '2022-01-07T08:00:51.948Z',
				end: '2022-01-09T08:00:51.948Z',
				color: 'info',
			},
			{
				id: 2,
				name: 'Fundraising',
				description:
					'GoFundMe: The most trusted online fundraising platform for any need or dream. Start a crowdfunding fundraiser in 5 minutes. Get help. Give kindness.',
				start: '2022-01-17T08:00:51.948Z',
				end: '2022-01-20T08:00:51.948Z',
				color: 'primary',
			},
		])
	}, [])

	const getDayEvents = (day = 0) => {
		let a, b, c, d
		a = b = c = d = new Date() // FIXME
		a = new Date(c.setDate(day))
		b = new Date(d.setDate(day - 1))
		return events.filter(
			(event) => new Date(event.start) < a && b < new Date(event.end)
		)
	}

	const saveEvent = ({ name, description, start, end, color }) => {
		let a, b
		a = b = new Date() // FIXME

		attemptSavingEvent({
			variables: {
				name,
				color,
				description,
				endDate: end,
				startDate: start,
				ownerId: state?.user?.id,
			},
		})

		setEvents([
			...events,
			{
				name,
				color,
				description,
				id: events.length,
				end: new Date(a.setDate(end)),
				start: new Date(b.setDate(start)),
			},
		])
	}

	const showNext = () => {
		console.log('go next')
	}

	const showPrev = () => {
		console.log('go prev')
	}

	return (
		<Container>
			<AddEventModal
				month={month}
				saveEvent={saveEvent}
				visible={showAddModal}
				toggle={() => setShowAddModal(!showAddModal)}
			/>
			<ShowEventModal
				visible={showModal}
				event={currentEvent}
				toggle={() => setShowModal(!showModal)}
				erase={() => {
					if (confirm('You are about to delete an event :(')) {
						setShowModal(false)
						setEvents([
							...events.filter((event) => event.id != currentEvent.id),
						])
					}
				}}
			/>
			<div className="d-flex justify-content-between mb-3">
				<span className="badge bg-light text-dark fs-4">
					{month.today.toLocaleString('default', {
						month: 'long',
						year: 'numeric',
					})}
				</span>
				<button
					className="btn btn-primary rounded-pill"
					onClick={() => setShowAddModal(!showAddModal)}
				>
					Add
				</button>
			</div>
			<Table bordered responsive className="text-center">
				<thead>
					<tr className="text-uppercase">
						{weekDays.map((day, id) => (
							<th key={id}>{day}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{monthWeeks.map((week, index) => (
						<tr key={index}>
							{weekDays.map((day, id) => {
								if (grid.day || month.firstDay.getDate() == grid.id) grid.day++
								grid.id++
								if (grid.day > month.lastDay.getDate()) grid.day = 0
								return (
									<td
										key={id}
										className={styles.box + ' ' + (!grid.day && 'bg-light')}
									>
										{grid.day != 0 && (
											<span
												className={
													grid.day == new Date().getDate()
														? 'text-primary fw-bold'
														: ''
												}
											>
												{grid.day}
											</span>
										)}
										{getDayEvents(grid.day).map((event, count) => {
											count < 3 ? (
												<button
													key={event.id}
													className={'btn btn-sm btn-' + event.color}
													onClick={() => {
														setCurrentEvent(
															events.find((item) => event.id == item.id)
														)
														setShowModal(!showModal)
													}}
												>
													{event.name}
												</button>
											) : (
												<button
													key={grid.day}
													className="btn btn-sm btn-secondary"
												>
													more +
												</button>
											)
										})}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</Table>
			<div className="d-flex justify-content-center">
				<button className="btn btn-primary mx-1" onClick={showPrev}>
					&laquo; Prev
				</button>
				<button className="btn btn-primary mx-1" onClick={showNext}>
					Next &raquo;
				</button>
			</div>
		</Container>
	)
}

export default Calendar
