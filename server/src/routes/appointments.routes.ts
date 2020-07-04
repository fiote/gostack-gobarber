import { getCustomRepository } from 'typeorm';
import { Router } from "express";
import { parseISO } from 'date-fns';

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.use(verifyToken);

router.get('/',async (request, response) => {
	const repo = getCustomRepository(AppointmentsRepository);
	const list = await repo.find();
	response.json(list);
});

router.post('/',async (request, response) => {
	const { provider_id, date } = request.body;
	const parsedDate = parseISO(date);
	const service = new CreateAppointmentService();
	const entry = await service.execute({provider_id, date: parsedDate});
	response.json(entry);
});

export default router;