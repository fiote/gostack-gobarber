import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

interface ExecuteTDO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	async execute({name, email, password}: ExecuteTDO) {
		const repo = getRepository(User);

		const exists = await repo.findOne({where: { email }});
		if (exists) throw new AppError('Email already being used.');

		const entry = repo.create({
			name,
			email,
			password: await hash(password,8)
		});
		await repo.save(entry);

		return entry;
	}
}

export default CreateUserService;