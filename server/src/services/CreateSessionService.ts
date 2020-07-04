import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import configAuth from '../configs/auth';
import AppError from '../errors/AppError';

interface ExecuteTDO {
	email: string,
	password: string
}

class CreateSessionService {
	async execute({email, password}: ExecuteTDO) {
		const repo = getRepository(User);
		const user = await repo.findOne({where: {email}});
		if (!user) throw new AppError("Invalid email/password.", 401);

		const right = await compare(password, user.password);
		if (!right) throw new AppError("Invalid email/password.", 401);

		const { secret, expiresIn } = configAuth.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn
		});

		return {
			user,
			token
		};
	}
}

export default CreateSessionService;