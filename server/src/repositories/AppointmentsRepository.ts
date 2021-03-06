import Appointment from '../models/Appointment'
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	public async findByDate(date: Date) {
		return await this.findOne({where: { date }});
	}
}

export default AppointmentsRepository;