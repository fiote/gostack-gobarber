import { ValidationError } from 'yup';

interface ParsedErrors {
	[key: string]: string
}

export default function getParsedErrors(err: ValidationError) {
	const parsed : ParsedErrors = {};
	err.inner.forEach(error => parsed[error.path] = error.message);
	return parsed;
}