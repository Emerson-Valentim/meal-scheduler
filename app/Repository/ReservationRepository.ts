import Reservation from 'App/Models/Reservation';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Reservation)
export default class ReservationRepository extends Repository<Reservation> {

}