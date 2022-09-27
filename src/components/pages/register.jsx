import React, {useEffect} from 'react';
import PreLoader from '../common/loader';
import {Link, useNavigate} from 'react-router-dom';
import Joi from 'joi';
import InputField from '../common/inputField';
import {register} from '../../services/authService';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [userType, setUserType] = React.useState('USER');

	const [errors, setErrors] = React.useState({firstname: null, lastname: null, email: null, password: null, confirmPassword: null});

	const navigate = useNavigate();

	const functionMap = {
		'firstname': setFirstname,
		'lastname': setLastname,
		'email': setEmail,
		'password': setPassword,
		'confirmPassword': setConfirmPassword,
	};

	const validateSchema = Joi.object({
		firstname: Joi.string().min(3).max(30).required(),
		lastname: Joi.string().min(3).max(30).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
		confirmPassword: Joi.string().required().custom((value, helpers) => {
			if (value !== password) {
				return helpers.message('Password isn\'t match');
			}
			return value;
		}).messages({'string.empty':'Confirm password not allowed to be empty'}),
	});

	useEffect(() => {
		console.log('useEffect');
		setInterval(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const validateProperty = (name, value) => {
		const schema = validateSchema.extract(name);
		const {error} = schema.validate(value);
		return error ? error.details[0].message : null;
	};
	const handleChange = (e) => {
		e.preventDefault();
		const {name, value} = e.target;
		functionMap[name](value);
		const error = validateProperty(name, value);
		if (error) setErrors({...errors, [name]: error});
		else setErrors({...errors, [name]: null});
	};

	const handleSubmit = async() => {
		setIsLoading(true);
		const {error} = validateSchema.validate({firstname, lastname, email, password, confirmPassword});
		if (error) {
			error.details.forEach((item) => {
				setErrors({...errors, [item.path[0]]: item.message});
			});
		}else {
			const response = await register({first_name: firstname, last_name: lastname, email: email, password: password, user_type: userType});
			if (response) {
				toast.success('Registration successful');
				console.log('success');
				navigate('/login');
			}
			else {
				toast.error('Registration failed');
				console.log('error');
			}
		}
		setIsLoading(false);
	};

	return (
		<div>
			<PreLoader isLoading={isLoading} />
			<section
				id="home"
				className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center"
			>
				<div className="container register-container">
					<div className="card bg-glass" style={{borderRadius: '3%'}}>
						<div className="card-body px-3 px-md-5">
							<form>
								<h2 className="fw-bold mb-3 text-uppercase" style={{textAlign: 'center'}}>Register</h2>
								<div className="row">
									<div className="col-md-6">
										<InputField
											type="text"
											name="firstname"
											label="First Name"
											value={firstname}
											onChange={handleChange}
											error={errors.firstname}
											labelStyle=''
											inputStyle=''
										/>
									</div>

									<div className="col-md-6">
										<InputField
											type="text"
											name="lastname"
											label="last Name"
											value={lastname}
											onChange={handleChange}
											error={errors.lastname}
											labelStyle=''
											inputStyle=''
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">

										<InputField
											type="email"
											name="email"
											label="Email"
											value={email}
											onChange={handleChange}
											error={errors.email}
											labelStyle=''
											inputStyle=''
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<InputField
											type="password"
											name="password"
											label="Password"
											value={password}
											onChange={handleChange}
											error={errors.password}
											labelStyle=''
											inputStyle=''
										/>
									</div>
									<div className="col-md-6">
										<InputField
											type="password"
											name="confirmPassword"
											label="Confirm Password"
											value={confirmPassword}
											onChange={handleChange}
											error={errors.confirmPassword}
											labelStyle=''
											inputStyle=''
										/>
									</div>
								</div>
								<Link to="/login" className="link-secondary text-danger">Already have an account? <span className="text-secondary">Login</span></Link>

							</form>
							<div className="d-flex justify-content-center mt-2">
								<button
									type="submit"
									className="btn btn-primary btn-block mb-3 mt-1 w-25"
									onClick={handleSubmit}
								>
									Register
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Register;