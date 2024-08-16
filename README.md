Here's a comprehensive `README.md` file to set up and run your project from scratch. This guide assumes you have a basic understanding of how to use command-line tools and are familiar with the general setup of a Flask backend and React frontend.

---

# Student Management System

This project is a web application for managing student data, including groups and individual student details. It consists of a Flask backend and a React frontend.

## Prerequisites

Before you start, make sure you have the following installed:
- [Python](https://www.python.org/downloads/) (version 3.8 or later)
- [Node.js](https://nodejs.org/) (version 14 or later)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [npm](https://docs.npmjs.com/) (Node package manager)

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/frknilisu/student-profile-poc.git
cd student-profile-poc
```

### 2. Set Up a Python Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up MongoDB

Make sure MongoDB is installed and running on your local machine. You can follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) if needed.

### 5. Create the MongoDB Collections

Use the MongoDB shell or MongoDB Compass to create the necessary collections:

```javascript
use student_db

// Create the 'students' collection and insert some test data
db.students.insertMany([
  {
    student_id: 1,
    name: "John",
    surname: "Doe",
    birthday: new Date("2005-05-15"),
    class_level: "VWO-3",
    school: "Example High School",
    mobile_number: "123-456-7890",
    group_id: 1
  }
]);

// Create the 'groups' collection and insert some test data
db.groups.insertMany([
  {
    group_id: 1,
    supervisor_name: "begeleider1"
  },
  {
    group_id: 2,
    supervisor_name: "begeleider2"
  }
]);
```

### 6. Configure the Backend

Make sure the backend code is correctly set up to connect to your MongoDB instance. Update the MongoDB URI if needed in `main.py`.

### 7. Run the Flask Backend

```bash
python main.py
```

The backend should be running at `http://localhost:5000`.

## Frontend Setup

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

### 2. Install Node.js Dependencies

```bash
npm ci
```

### 3. Start the React Frontend

```bash
npm start
```

The frontend should be running at `http://localhost:3000`.

## API Endpoints

### Students

- **Create Student**
  - **Endpoint**: `POST /createStudent`
  - **Body**: `{"name": "John", "surname": "Doe", "birthday": "YYYY-MM-DD", "class_level": "High School 2", "school": "Example High School", "mobile_number": "123-456-7890", "group_id": 1}`

- **Get Students**
  - **Endpoint**: `GET /getStudents`
  - **Query Params**: None (get all)

- **Get Student**
  - **Endpoint**: `GET /getStudent/:student_id`
  - **Query Params**: `id` (get specific student)

- **Update Student**
  - **Endpoint**: `PUT /update/:student_id`
  - **Body**: `{"name": "John", "surname": "Doe", "birthday": "YYYY-MM-DD", "class_level": "High School 2", "school": "Example High School", "mobile_number": "123-456-7890", "group_id": 1}`

- **Delete Student**
  - **Endpoint**: `DELETE /delete/:student_id`

### Groups

- **Get Group Details**
  - **Endpoint**: `GET /groups/:group_id`
  - **Returns**: Group details and list of students in that group

## Navigation in the Frontend

- **Groups Overview**: Displays all groups. Navigate to individual group details.
- **Students Overview**: Displays all students. Navigate to individual student details.
- **Group Details**: Shows detailed information about a specific group and its students.
- **Student Details**: Shows detailed information about a specific student.

## Troubleshooting

- **CORS Issues**: Ensure that the backend allows CORS from the frontend. You can use the `flask-cors` package for this.
- **MongoDB Connection Issues**: Verify that MongoDB is running and the connection URI is correct.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify this README to better fit your project's specifics and any additional setup steps you may need.