#  Fleet Management System

## Running the app

```bash
# clone
$ git clone https://github.com/Samir984/fleet-management-system.git

$ cd fleet-management-system/

# dev mode
$ npm run  start:dev
```

# Test the Endpoints

### Base URL: http://localhost:3000/

## 1. Register a User

#### Endpoint: POST &nbsp;&nbsp;[localhost]/api/users/register

**Example Request:**

```bash
{
  "fullName": "admin_name",
  "email":"admin_id@gmail.com",
  "password": "admin_password"
}

```

## 2. login User

#### Endpoint: POST &nbsp;&nbsp;[localhost]/api/users/login

**Example Request:**

```bash
{
  "email":"admin_id@gmail.com",
  "password": "admin_password"
}

```

<br>
<br>

# From Now, for any subsequent request ,ADD

<h1 style="color:red">
Authorization: Bearer [token]
</h1>

<br>

# Vechicle End point:

## 1. Creating a new vehicle

#### Endpoint: POST &nbsp;&nbsp;[localhost]/api/vehicles/

**Example Request:**

```bash
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2022,
  "registrationNumber": "ABC984",
  "currentStatus": "active",
  "location": "Garage",
  "maintenanceTask": [
    {
      "date": "2022-02-23T00:00:00.000Z",
      "description": "Oil Change"
    },
    {
      "date": "2022-02-24T00:00:00.000Z",
      "description": "Tire Rotation"
    }
  ],
  "assignedDriver": "some_driver_id"
}

```

<br>

## 2. Retrieving a single vehicle by ID

#### Endpoint: GET &nbsp;&nbsp;[localhost]/api/vehicles/[:id]

<br>

## 3. Listing all vehicles

#### Endpoint: GET &nbsp;&nbsp;[localhost]/api/vehicles/

<br>

## 4. deleting a vehicle

#### Endpoint: DELETE &nbsp;&nbsp;[localhost]/api/vehicles/[:id]

<br>

## 5. Updating an existing vehicle

#### Endpoint: PATCH &nbsp;&nbsp;[localhost]/api/vehicles/[:id]

**Example Request:**

```bash
{
    "currentStatus": "under maintenance",
}
```

<br>
<br>

# Functionality Endpoint

## 1. Endpoints for assigning drivers

#### Endpoint: PATCH &nbsp;&nbsp;[localhost]/vehicles/[:id]/assign-driver

**Example Request:**

```bash
{
  "assignedDriver": "driver1234"
}

```

<br>

## 2. Managing maintenance tasks for each vehicle.

#### Endpoint: PATCH &nbsp;&nbsp;[localhost]/vehicles/[:id]/maintenance-task

**Example Request:**

```bash
{
"date":"2022-02-24",
"description":"Tire change"
}

```

<br>
<br>

 # 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 







