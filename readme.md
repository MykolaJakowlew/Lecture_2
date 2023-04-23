## API route for returning list of online users

METHOD: GET
PATH: /users?status=online|offline
RESPONSE:
```
{
 users: [{ userName: string, status: 'online' | 'offline' }]
}
```

## Setup integration tests

1. npm i mongodb-memory-server