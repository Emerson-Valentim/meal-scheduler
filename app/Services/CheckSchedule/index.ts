import HttpException from 'App/Exceptions/HttpException';
import Establishment from 'App/Models/Establishment';
import { Interval } from 'App/Models/Reservation';
import Schedule from 'App/Models/Schedule';
import Table from 'App/Models/Table';
import ReservationRepository from 'App/Repository/ReservationRepository';
import { DateTime } from 'luxon';

export interface ReservationConfig {
  table: Table,
  establishment: Establishment,
  interval: Interval
}

export default class CheckSchedule {

  private static operator = {
    '>=': (a, b) => +a >= +b,
    '<=': (a, b) => +a <= +b
  }

  public static async isIntervalAvailable(
    {
      table,
      establishment,
      interval
    }: ReservationConfig,
    reservationRepository: ReservationRepository
  ) {
    if (
      CheckSchedule.isValidInterval(interval) &&
      await CheckSchedule.isValidSchedule(interval, establishment.schedule)
    ) {
      const { rows: reservations } = await reservationRepository.findConcurrent({
        ...interval,
        table_id: table.id,
        establishment_id: establishment.id
      })
      if (reservations.length) throw new HttpException('This interval is not available', 400, {})
    }
  }

  private static isValidInterval(interval: Interval): Boolean {
    if (interval.start.toMillis() <= DateTime.now().toMillis()) {
      throw new HttpException('Invalid interval date, start should be greater then now', 400, {})
    }

    if (interval.start.toMillis() >= interval.end.toMillis()) {
      throw new HttpException('Invalid interval date, start should be lower then end', 400, {})
    }

    return true
  }

  private static async isValidSchedule(interval: Interval, schedule: Schedule): Promise<Boolean> {
    if (schedule) {
      const { definition } = schedule
      const { start, end } = interval

      const dayStart = start.weekday
      const dayEnd = end.weekday

      console.log(dayStart, dayEnd)

      if(dayStart !== dayEnd) {
        throw new HttpException('Reservations can not be longer than 1 day', 400, {})
      }

      if (!definition[dayStart] && !definition[dayEnd]) {
        throw new HttpException('Interval days is not available on schedule', 400, {})
      }

      const hourStart = start.toFormat('HH:mm:ss')
      const hourEnd = end.toFormat('HH:mm:ss')

      this.compareTime(hourStart, { rule: definition[dayStart].start, operator: '>=' })
      this.compareTime(hourEnd, { rule: definition[dayEnd].end, operator: '<=' })

      return true
    }

    throw new HttpException('Establishment has no schedule', 400, {})
  }

  private static compareTime(time, { rule, operator: operation }) {
    const timeSplit = time.split(':')
    const ruleSplit = rule.split(':')

    const dateNow = DateTime.now().toUTC()

    const timeDate = dateNow.set({
      hour: timeSplit[0],
      minute: timeSplit[1],
      second: timeSplit[2]
    })

    const ruleDate = dateNow.set({
      hour: ruleSplit[0],
      minute: ruleSplit[1],
      second: ruleSplit[2],
    })

    if (!(this.operator[operation](timeDate.toMillis(), ruleDate.toMillis()))) {
      throw new HttpException('Establishment is not working at this time', 400, {})
    }
  }
}