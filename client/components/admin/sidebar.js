import Link from 'next/link'
import { Card } from 'react-bootstrap'

const Sidebar = () => {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-dark text-white">Quick Menu</Card.Header>
      <Card.Body className="p-0">
        <div className="list-group list-group-flush">
          <Link href="/dashboard/admin/">
            <a className="list-group-item list-group-item-action">
              Admin Area &rarr;
            </a>
          </Link>
          <Link href="/dashboard/admin/user">
            <a className="list-group-item list-group-item-action">
              Users &rarr;
            </a>
          </Link>
          <Link href="/dashboard/admin/appointments">
            <a className="list-group-item list-group-item-action">
              Appointments &rarr;
            </a>
          </Link>
          <Link href="/dashboard/admin/notifications">
            <a className="list-group-item list-group-item-action">
              Notifications &rarr;
            </a>
          </Link>
          <Link href="/dashboard/admin/chats">
            <a className="list-group-item list-group-item-action">
              Chats &rarr;
            </a>
          </Link>
          <Link href="/dashboard/admin/announcement">
            <a className="list-group-item list-group-item-action">
              Announcement &rarr;
            </a>
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Sidebar
