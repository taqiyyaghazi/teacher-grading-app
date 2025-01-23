# API Documentation: Teacher Grading API

## Endpoint: Create User

### Description

Creates a new user in the system.

---

### URL

`POST /users`

---

### Request Body

| Field      | Type     | Validation                           | Required | Description                    |
| ---------- | -------- | ------------------------------------ | -------- | ------------------------------ |
| `email`    | `string` | Valid email format                   | Yes      | The user's email address.      |
| `name`     | `string` | Non-empty                            | Yes      | The user's full name.          |
| `password` | `string` | Minimum length: 8 characters         | Yes      | The user's password.           |
| `role`     | `string` | Must be one of: `STUDENT`, `TEACHER` | Yes      | The user's role in the system. |

#### Example

```json
{
  "email": "johndoe@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "STUDENT"
}
```

### Response

<b>201 Created</b>
Indicates the user has been successfully created.

<b>400 Bad Request</b>
Returned when the request body fails validation.
Example Response:

```json
{
  "message": "Email must be a valid email address"
}
```

<b>400 Bad Request</b>
Returned when email already exist.
Example Response:

```json
{
  "message": "User already exists"
}
```

## Endpoint: Login

### Description

Authenticates a user and returns an access token and role upon successful login.

---

### URL

`POST /auth/login`

---

### Request Headers

| Key            | Value              | Required |
| -------------- | ------------------ | -------- |
| `Content-Type` | `application/json` | Yes      |

---

### Request Body

| Field      | Type     | Validation         | Required | Description               |
| ---------- | -------- | ------------------ | -------- | ------------------------- |
| `email`    | `string` | Valid email format | Yes      | The user's email address. |
| `password` | `string` | Non-empty          | Yes      | The user's password.      |

#### Example

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

<b>201 Created</b>
Indicates the user was successfully authenticated.
Example Response:

```json
{
  "result": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "user-id"
    "role": "STUDENT"
  },
  "message": "Successfully logged in"
}
```

<b>400 Bad Request</b>
Returned when the request body fails validation.
Example Response:

```json
{
  "message": "password must be a string"
}
```

<b>400 Bad Request</b>
Returned when email not registered.
Example Response:

```json
{
  "message": "User not registered"
}
```

<b>401 Unauthorized</b>
Returned when authentication fails due to invalid credentials.
Example Response:

```json
{
  "message": "Invalid password"
}
```

## Endpoint: Submit Assignment

### Description

Allows students to submit an assignment.

### URL

`POST /assignments`

### Request Headers

| Key             | Value            | Required |
| --------------- | ---------------- | -------- |
| `Authorization` | `Bearer <token>` | Yes      |

### Roles

- **STUDENT**: This endpoint is restricted to users with the `STUDENT` role.

### Request Body

| Field     | Type     | Validation              | Required | Description                    |
| --------- | -------- | ----------------------- | -------- | ------------------------------ |
| `subject` | `string` | Must be a valid subject | Yes      | The subject of the assignment. |
| `title`   | `string` | Non-empty string        | Yes      | The title of the assignment.   |
| `content` | `string` | Non-empty string        | Yes      | The content of the assignment. |

#### Example Request

```json
{
  "subject": "MATH_HOMEWORK",
  "title": "Algebra Assignment",
  "content": "Solve the attached problems."
}
```

### Response

<b>201 Created</b>
Indicates that the assignment was successfully submitted.
Example Response:

```json
{
  "message": "Assignment submitted successfully"
}
```

<b>400 Bad Request</b>
Returned when the request body fails validation.
Example Response:

```json
{
  "message": "subject must be a valid enum value"
}
```

<b>403 Forbidden</b>
Indicates that the user does not have the required role to access this endpoint.
Example Response:

```json
{
  "message": "Forbidden resource"
}
```

## Endpoint: Get Assignments

### Description

Allows teachers to retrieve all assignments optionally filtered by subject.

### URL

`GET /assignments`

### Request Headers

| Key             | Value            | Required |
| --------------- | ---------------- | -------- |
| `Authorization` | `Bearer <token>` | Yes      |

### Roles

- **TEACHER**: This endpoint is restricted to users with the `TEACHER` role.

### Query Parameters

| Parameter | Type     | Required | Description                     |
| --------- | -------- | -------- | ------------------------------- |
| `subject` | `string` | No       | Filters assignments by subject. |

### Response

<b>200 OK</b>
Returns a list of assignments. Each assignment contains information about the student, grade (if graded), and submission details.
Example Response:

```json
{
  "result": [
    {
      "id": "assignment1",
      "subject": "MATH",
      "title": "Algebra Assignment",
      "content": "Solve the attached problems.",
      "student": { "name": "John Doe" },
      "grade": {
        "createdAt": "2024-01-01T12:00:00.000Z",
        "feedback": "Good work!",
        "grade": 90,
        "teacher": { "name": "Ms. Smith" }
      },
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

<b>403 Forbidden</b>
Indicates that the user does not have the required role to access this endpoint.
Example Response:

```json
{
  "message": "Forbidden resource"
}
```

## Endpoint: Create Grade

### Description

This endpoint allows a teacher to create a grade and provide feedback for a specific assignment.

### URL

`POST /grades`

### Request Headers

| Key             | Value            | Required |
| --------------- | ---------------- | -------- |
| `Authorization` | `Bearer <token>` | Yes      |

### Roles

- **TEACHER**: This endpoint is restricted to users with the `TEACHER` role.

### Request Body

| Field          | Type     | Validation       | Required | Description                            |
| -------------- | -------- | ---------------- | -------- | -------------------------------------- |
| `grade`        | `number` | Required, 0-100  | Yes      | The numeric grade for the assignment.  |
| `feedback`     | `string` | Non-empty string | Yes      | Feedback for the student.              |
| `assignmentId` | `string` | Non-empty string | Yes      | The ID of the assignment being graded. |

#### Example Request

```json
{
  "grade": 85,
  "feedback": "Well done!",
  "assignmentId": "12345"
}
```

### Response

<b>201 Created</b>
Indicates that the grade was successfully created.
Example Response:

```json
{
  "message": "Successfully assessed"
}
```

<b>400 Bad Request</b>
Returned when the request body fails validation.
Example Response:

```json
{
  "message": "grade must be a number"
}
```

<b>400 Bad Request</b>
Returned when assignment not found.
Example Response:

```json
{
  "message": "Assignment not found"
}
```

<b>400 Bad Request</b>
Returned when assignment already graded.
Example Response:

```json
{
  "message": "Assignment already graded"
}
```

<b>403 Forbidden</b>
Indicates that the user does not have the required role to access this endpoint.
Example Response:

```json
{
  "message": "Forbidden resource"
}
```

## Endpoint: Get Grades

### Description

Retrieve all grades for a specific student. This endpoint ensures that students can only view their own grades.

### URL

`GET /grades/:studentId`

### Request Headers

| Key             | Value            | Required |
| --------------- | ---------------- | -------- |
| `Authorization` | `Bearer <token>` | Yes      |

### Roles

- **STUDENT**: This endpoint is restricted to users with the `STUDENT` role.

### Path Parameters

| Parameter   | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `studentId` | `string` | The ID of the student whose grades are being fetched. |

### Response

<b>200 OK</b>
Returns a List of grades for the student.
Example Response:

```json
{
  "result": [
    {
      "id": "assignment123",
      "subject": "Math",
      "title": "Algebra Homework",
      "content": "Solve all the equations",
      "studentId": "student123",
      "createdAt": "2025-01-20T10:00:00Z",
      "updatedAt": "2025-01-21T10:00:00Z",
      "grades": [
        {
          "grade": 95,
          "feedback": "Excellent effort!",
          "teacherId": "teacher456",
          "createdAt": "2025-01-21T09:00:00Z"
        }
      ]
    }
  ]
}
```

<b>403 Forbidden</b>
Indicates that the user does not have the required role to access this endpoint.
Example Response:

```json
{
  "message": "Forbidden resource"
}
```

## Endpoint: Get Notifications

### Description

Retrieve all notifications for a three hours latest new submission.

### URL

`GET /notifications`

### Request Headers

| Key             | Value            | Required |
| --------------- | ---------------- | -------- |
| `Authorization` | `Bearer <token>` | Yes      |

### Roles

- **TEACHER**: This endpoint is restricted to users with the `TEACHER` role.

### Response

<b>200 OK</b>
Returns a List of notifications.
Example Response:

```json
{
  "result": [
        {
            "message": "New assignment submitted by: Ghazi with title: \"Tugas Matematika Terbaru\".",
            "createdAt": "2025-01-23T00:37:34.142Z"
        },
        {
            "message": "New assignment submitted by: Ghazi with title: \"Tugas Matematika Terbaru\".",
            "createdAt": "2025-01-23T00:09:31.560Z"
        },
        {
            "message": "New assignment submitted by: Ghazi with title: \"Tugas Matematika Terbaru\".",
            "createdAt": "2025-01-23T00:09:20.085Z"
        }
  ]
}
```

<b>403 Forbidden</b>
Indicates that the user does not have the required role to access this endpoint.
Example Response:

```json
{
  "message": "Forbidden resource"
}
```
