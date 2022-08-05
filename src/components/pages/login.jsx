import React, {useEffect} from 'react';
import PreLoader from '../common/loader';

const Login = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {

		setInterval(() => {
			setIsLoading(false);
		}, 3000);
	});
	return (
		<div>
			<PreLoader isLoading={isLoading} />
			<h1>Login</h1>
			<form>
				<label>
                    Email:
					<input type="text" name="email"/>
				</label>
				<label>
                    Password:
					<input type="password" name="password"/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default Login;