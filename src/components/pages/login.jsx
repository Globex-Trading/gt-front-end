import React, { useContext, useEffect } from 'react';
import PreLoader from '../common/loader';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../common/inputField';
import Joi from 'joi';
import { getUser, login } from '../../services/authService';
import toast from 'react-hot-toast';
import { StoreContext } from '../common/stateProvider';

const Login = () => {
	const { state, setState } = useContext(StoreContext);

	const [isLoading, setIsLoading] = React.useState(true);

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const [errors, setErrors] = React.useState({ email: null, password: null });

	const navigate = useNavigate();
	const functionMap = {
		email: setEmail,
		password: setPassword,
	};

	useEffect(() => {
		setInterval(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	const validateSchema = Joi.object({
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		}),
		password: Joi.string()
			.required()
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
	});

	const validateProperty = (name, value) => {
		const schema = validateSchema.extract(name);
		const { error } = schema.validate(value);
		return error ? error.details[0].message : null;
	};
	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		functionMap[name](value);
		const error = validateProperty(name, value);
		if (error) setErrors({ ...errors, [name]: error });
		else setErrors({ ...errors, [name]: null });
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		const { error } = validateSchema.validate({ email, password });
		if (error) {
			error.details.forEach((item) => {
				setErrors({ ...errors, [item.path[0]]: item.message });
			});
		} else {
			const response = await login({ email: email, password: password });
			if (response) {
				toast.success('Logged in successfully');
				const user = await getUser();
				setState({...state, ['user']: user});
				navigate('/');
			} else console.log('error');
		}
	};

	return (
		<div>
			<PreLoader isLoading={isLoading} />
			<section
				id="login"
				className="section welcome-area login-styles overflow-hidden d-flex align-items-center"
			>
				<div className="container login-container">
					<div className="card bg-glass" style={{ borderRadius: '3%' }}>
						<div className="card-body px-4 py-5 px-md-5">
							<form>
								<h2
									className="fw-bold mb-4 text-uppercase font-weight-bold"
									style={{ textAlign: 'center', color: '#502570' }}
								>
                  Login
								</h2>

								<InputField
									type="email"
									name="email"
									label="Email Address"
									value={email}
									onChange={handleChange}
									error={errors.email}
									labelStyle=""
									inputStyle=""
									disabled={false}
								/>

								<InputField
									type="password"
									name="password"
									label="Password"
									value={password}
									onChange={handleChange}
									error={errors.password}
									labelStyle=""
									inputStyle=""
									disabled={false}
								/>

								<Link to="/register" className="link-secondary text-danger">
                  Need to create new account?
								</Link>
							</form>
							<button
								type="submit"
								className="btn btn-primary btn-block mb-3 mt-1 border border-white "
								style={{ backgroundColor: '#ec6850' }}
								onClick={handleSubmit}
							>
                Login
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
