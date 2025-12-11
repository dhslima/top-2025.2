"use server";

import { db } from "../_lib/prisma";

interface CreateBookingParams {
  userId: string;
  serviceId: string;
  bookingTime: Date;
}

export const createBooking = async ({
  userId,
  serviceId,
  bookingTime,
}: CreateBookingParams) => {
  await db.booking.create({
    data: {
      userId,
      serviceId,
      bookingTime,
    },
  });
};
