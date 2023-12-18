# todo-list

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Endpoints

    GET /todos:
    Retrieve a list of all tasks.
    
    GET /todos/:id:
    Retrieve a specific task by its ID.
    
    POST /todos:
    Create a new task.
    
    PUT /todos/:id:
    Update an existing task by its ID.
    
    DELETE /todos/:id:
    Delete a task by its ID.


    POST /auth/login:
    Login with username and password.

