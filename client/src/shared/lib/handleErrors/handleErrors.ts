import { DataType } from "entities/user/model/types/data-type";
import { Errors } from "pages/AuthPage/ui/AuthPage";

export const handleErrors = (error: DataType, setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
	setErrors({
		username: error.errors.find(err => err.path === 'username')?.msg || '',
		password: error.errors.find(err => err.path === 'password')?.msg || '',
		validation: error.message || ''
	});
}
