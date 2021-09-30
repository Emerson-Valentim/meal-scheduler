import Reservation from 'App/Models/Reservation';

export abstract class ReservationHook {
  public static setIntervalUTC(reservation: Reservation) {
    reservation.interval.start = reservation.interval.start.toUTC()
    reservation.interval.end = reservation.interval.end.toUTC()
  }
}