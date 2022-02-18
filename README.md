# SDAAMS

Smart Daily Activity Appointment Management System ??

## Installation

- `cd server/ && npm i && cd ../client && npm i`
- rename `server/.env.example` -> `server/.env`
- rename `server/config/config.example.json` -> `server/config/config.json`
- edit `server/.env` to match your enviroment
- edit `server/config/config.json` to match your enviroment

## Checklist

- [x] authentication & authorization
- [x] chat
- [x] comments
- [x] notifications & reminder

## Grapqhl samples

### Mutation

- register

```graphql
mutation {
  register(
    firstName: "mr"
    lastName: "user"
    email: "user@email.com"
    password: "password"
  )
}
```

- add appointment

```graphql
mutation {
  addAppointment(
    name: "birthday"
    description: "I need this"
    endDate: "2021-12-21"
    startDate: "2021-12-22"
    ownerId: 1
  ) {
    id
    name
    description
    endDate
    startDate
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
    }
  }
}
```

### Queries

- login

```graphql
{
  login(email: "user@email.com", password: "password")
}
```

- get users

```graphql
{
  users {
    id
    firstName
    lastName
    email
    image
    role
  }
}
```

- get appointments

```graphql
{
  appointments {
    id
    name
    description
    endDate
    startDate
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
    }
    approver {
      id
      firstName
      lastName
    }
  }
}
```

#### Tip

use concurrently to run frontend and backend simultenously

- concurrently 'npm run dev --prefix client' 'npm run dev --prefix server'
