import { Context } from '@/lib/context'
import styles from '@/styles/shared.module.css'
import { Table } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import { GET_APPOINTMENTS } from '@/lib/graphql/queries'
import { ADD_APPOINTMENT } from '@/lib/graphql/mutations'
import ShowEventModal from '@/components/calendar/show'
import AddEventModal from '@/components/calendar/add'

const Calendar = () => {
	// GRID
	const today = new Date()
	let grid = { id: 0, day: 0 }
	const monthWeeks = [0, 1, 2, 3, 4, 5]
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
	const appointmentsQuery = useQuery(GET_APPOINTMENTS)
	const [attemptSavingEvent, { data, loading, error }] = useMutation(
		ADD_APPOINTMENT,
		{
			errorPolicy: 'all',
			onCompleted: (data) => {
				if (data?.addAppointment) {
					setEvents([...events, data?.addAppointment])
				}
			},
		}
	)

	useEffect(() => {
		if (appointmentsQuery?.data) {
			setEvents(appointmentsQuery?.data?.appointments)
		}
	}, [])

	const getDayEvents = (day = 0) => {
		let a, b, c, d
		a = b = c = d = new Date() // FIXME
		a = new Date(c.setDate(day))
		b = new Date(d.setDate(day - 1))

		return events.filter((event) => {
			console.log(new Date(event.startDate))
			// return new Date(event.startDate) < a && b < new Date(event.endDate)
			return []
		})
	}

	const saveEvent = ({ name, description, start, end, color }) => {
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
	}

	const showNext = () => {
		console.log('go next')
	}

	const showPrev = () => {
		console.log('go prev')
	}

	return (
		<>
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
					Add Event
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
								if (grid.day || month.firstDay.getDay() == grid.id) grid.day++
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
		</>
	)
}

export default Calendar
