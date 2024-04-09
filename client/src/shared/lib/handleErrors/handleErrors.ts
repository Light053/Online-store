import { DataType } from "entities/user/model/types/data-type";
import { Errors } from "pages/AuthPage/ui/AuthPage";

export const handleErrors = (error: DataType, setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
	let usernameError = '';
	let passwordError = '';

	if (Array.isArray(error.errors)) {
		const usernameErr = error.errors.find(err => err.path === 'username');
		const passwordErr = error.errors.find(err => err.path === 'password');

		usernameError = usernameErr ? usernameErr.msg : '';
		passwordError = passwordErr ? passwordErr.msg : '';
	}

	setErrors({
		username: usernameError,
		password: passwordError,
		validation: error.message || ''
	});
}

