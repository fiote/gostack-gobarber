import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import verifyToken from '../middlewares/verifyToken';
import multer from 'multer'
import configUpload from '../configs/upload';
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const router = Router();
const upload = multer(configUpload);

router.post('/',async (request, response) => {
	const { name, email, password } = request.body;
	const service = new CreateUserService();
	const user = await service.execute({name, email, password});
	delete user.password;
	response.json(user);
});

router.patch('/avatar', verifyToken, upload.single('avatar'), async (request, response) => {
	const service = new UpdateUserAvatarService();
	const user = await service.execute({
		user_id: request.user.id,
		filename: request.file.filename
	});
	response.json(user);
});

export default router;