import { useState, useEffect } from 'react';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

export const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log('Employee updated successfully:', response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('There was an error updating the employee!', error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log('Employee created successfully:', response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('There was an error creating the employee!', error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return 'Edit Employee';
    }
    return 'Add Employee';
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h1 className="text-center">{pageTitle()}</h1>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name : </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name ..."
                  className={`form-control ${
                    errors.firstName ? 'is-invalid' : ''
                  }`}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name : </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="last name ..."
                  className={`form-control ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email : </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ..."
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-primary"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
