import { startOfHour } from 'date-fns';
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

interface ExecuteTDO {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	async execute({provider_id, date}: ExecuteTDO) {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const appointmentDate = startOfHour(date);
		const exists = await appointmentsRepository.findByDate(appointmentDate);
		if (exists) throw new AppError('This appointment is already booked.');

		const appointment = appointmentsRepository.create({provider_id, date:appointmentDate});
		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;