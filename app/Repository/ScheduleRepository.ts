import Schedule from 'App/Models/Schedule';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Schedule)
export default class ScheduleRepository extends Repository<Schedule> {

}