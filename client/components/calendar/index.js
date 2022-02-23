import {
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '@/lib/graphql/mutations'
import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import styles from '@/styles/shared.module.css'
import AddAppointmentModal from '@/components/calendar/add'
import ShowAppointmentModal from '@/components/calendar/show'
import EditAppointmentModal from '@/components/calendar/edit'

const Calendar = ({ data, state, profile, refetch }) => {
  // GRID
  let today = new Date()
  let grid = { id: 0, day: 0 }
  const monthWeeks = [0, 1, 2, 3, 4, 5]
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  // STATE
  const [appointments, setAppointments] = useState(data)
  const [monthDifference, setMonthDifference] = useState(0)
  const [currentAppointment, setCurrentAppointment] = useState({})
  const [month, setMonth] = useState({
    today,
    firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
    lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  })
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // MUTATIONS
  const [attemptSavingAppointment, saveAppointmentMutation] = useMutation(
    ADD_APPOINTMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.addAppointment) {
          setAppointments([...appointments, data?.addAppointment])
          refetch()
        }
      },
    }
  )
  const [attemptUpdatingAppointment, updateAppointmentMutation] = useMutation(
    UPDATE_APPOINTMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.updateAppointment) {
          setAppointments([
            data?.updateAppointment,
            ...appointments.filter(
              (appointment) => appointment.id != currentAppointment.id
            ),
          ])
        }
      },
    }
  )
  const [attemptDeletingAppointment, deleteAppointmentMutation] = useMutation(
    DELETE_APPOINTMENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data?.deleteAppointment) {
          setAppointments([
            ...appointments.filter(
              (appointment) => appointment.id != currentAppointment.id
            ),
          ])
          setShowModal(false)
          refetch()
        }
      },
    }
  )

  useEffect(() => {
    setAppointments(data)

    today = new Date()
    grid = { id: 0, day: 0 }
    today.setMonth(today.getMonth() + monthDifference)

    setMonth({
      today,
      firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
      lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    })
  }, [data, monthDifference])

  const getDayAppointments = (day = 0) => {
    let a = new Date() // FIXME: loop this
    let b = new Date()
    let c = new Date()
    let d = new Date()

    a.setMonth(a.getMonth() + monthDifference)
    b.setMonth(b.getMonth() + monthDifference)
    c.setMonth(c.getMonth() + monthDifference)
    d.setMonth(d.getMonth() + monthDifference)

    a.setDate(day)
    b.setDate(day - 1)

    return appointments.filter((appointment) => {
      if (!appointment?.isApproved) return
      c.setTime(appointment?.startDate)
      d.setTime(appointment?.endDate)
      return c < a && b < d
    })
  }

  const saveAppointment = ({ name, description, start, end, color }) => {
    attemptSavingAppointment({
      variables: {
        name,
        color,
        description,
        endDate: end,
        startDate: start,
        ownerId: state?.user?.id,
        approverId: Number.parseInt(profile?.id),
        isApproved:
          state?.user?.id == Number.parseInt(profile?.id) ? true : false,
      },
    })
  }

  const updateAppointment = ({ id, name, description, start, end, color }) => {
    attemptUpdatingAppointment({
      variables: {
        id,
        name,
        color,
        description,
        endDate: end,
        startDate: start,
        ownerId: state?.user?.id,
      },
    })
  }

  const deleteAppointment = () => {
    if (confirm('You are about to delete an event :('))
      attemptDeletingAppointment({
        variables: { id: Number.parseInt(currentAppointment.id) },
      })
  }

  return (
    <>
      <AddAppointmentModal
        month={month}
        visible={showAddModal}
        monthDifference={monthDifference}
        saveAppointment={saveAppointment}
        toggle={() => setShowAddModal(!showAddModal)}
      />
      <ShowAppointmentModal
        state={state}
        visible={showModal}
        erase={deleteAppointment}
        appointment={currentAppointment}
        toggle={() => setShowModal(!showModal)}
        update={() => {
          setShowModal(!showModal)
          setShowEditModal(!showEditModal)
        }}
      />
      <EditAppointmentModal
        month={month}
        visible={showEditModal}
        appointment={currentAppointment}
        monthDifference={monthDifference}
        updateAppointment={updateAppointment}
        toggle={() => setShowEditModal(!showEditModal)}
      />
      <div className="d-flex justify-content-between mb-3">
        <span className="badge bg-light text-dark fs-4">
          {month.today.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <div>
          <button
            title="previous month"
            data-bs-toggle="tooltip"
            className="btn btn-secondary rounded-pill ms-1"
            onClick={() => setMonthDifference(monthDifference - 1)}
          >
            &#9754;
          </button>
          <button
            title="next month"
            data-bs-toggle="tooltip"
            className="btn btn-secondary rounded-pill ms-1"
            onClick={() => setMonthDifference(monthDifference + 1)}
          >
            &#9755;
          </button>
          {state?.user?.id && (
            <button
              className="btn btn-primary rounded-pill ms-1"
              onClick={() => setShowAddModal(!showAddModal)}
            >
              + Appointment
            </button>
          )}
        </div>
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
                    {getDayAppointments(grid.day).map((appointment, count) => (
                      <button
                        key={appointment.id}
                        className={
                          'btn btn-sm d-block w-100 p-0 text-truncate mx-auto btn-' +
                          appointment.color +
                          ' ' +
                          styles.eventBtn
                        }
                        onClick={() => {
                          setCurrentAppointment(
                            appointments.find(
                              (item) => appointment.id == item.id
                            )
                          )
                          setShowModal(!showModal)
                        }}
                      >
                        {appointment.name}
                      </button>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mx-1"
          onClick={() => setMonthDifference(monthDifference - 1)}
        >
          &laquo; Prev
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setMonthDifference(monthDifference + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </>
  )
}

export default Calendar
