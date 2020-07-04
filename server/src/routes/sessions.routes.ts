import { Router } from "express";
import CreateSessionService from "../services/CreateSessionService";
import AppError from '../errors/AppError';

const router = Router();

router.post('/',async (request, response) => {
	const { email, password } = request.body;
	const service = new CreateSessionService();
	const { user, token } = await service.execute({email, password});
	delete user.password;
	response.json({ user, token });
});

export default router;