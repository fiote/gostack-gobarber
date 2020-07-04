import { getRepository, getCustomRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

import fs from 'fs';
import path from 'path';
import configUpload from '../configs/upload';

interface ExecuteTDO {
	user_id: string,
	filename: string
}

class UpdateUserAvatarService {
	public async execute({ user_id, filename }: ExecuteTDO) {
		const repo = getRepository(User);
		const user = await repo.findOne(user_id);
		if (!user) throw new AppError("Only authed users can change their avatars.",401);

		if (user.avatar) {
			const userAvatarPath = path.join(configUpload.directory,user.avatar);
			const userAvatarFile = await fs.promises.stat(userAvatarPath);
			if (userAvatarFile) await fs.promises.unlink(userAvatarPath);
		}

		user.avatar = filename;
		await repo.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;