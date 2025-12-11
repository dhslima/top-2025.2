"use client";

import { TIME_LIST } from "@/_constants/time_list";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface ReservationSheetProps {
  name: string;
  price: number;
  serviceId: string;
  barbershop: string;
}

const ReservationSheet = ({
  name,
  price,
  serviceId,
  barbershop,
}: ReservationSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelectedDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time);
  };

  const { data } = authClient.useSession();

  const handleCreateBooking = async () => {
    try {
      if (!data?.user || !selectedDate || !selectedTime) return;

      const hour = selectedTime?.split(":")[0];
      const minutes = selectedTime?.split(":")[1];

      const newDate = set(selectedDate, {
        hours: Number(hour),
        minutes: Number(minutes),
        seconds: 0,
        milliseconds: 0,
      });

      await createBooking({
        userId: data?.user.id as string,
        serviceId,
        bookingTime: newDate,
      });

      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      toast.error("Erro ao criar reserva. Tente novamente.");
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-xl">Fazer Reserva</SheetTitle>
      </SheetHeader>
      <div className="border-t border-solid px-5">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={selectedDate}
          onSelect={handleSelectedDate}
          disabled={{ before: new Date() }}
          className="w-full"
          classNames={{
            /* estrutura */
            month_grid: "w-full border-collapse",
            weekdays: "grid grid-cols-7",
            week: "grid grid-cols-7 w-full",

            /* cabeçalho (seg, ter, qua...) */
            weekday: "capitalize text-center text-xs w-full",

            /* célula */
            // cell: "w-full h-9 p-0 relative",
            day: "w-full h-9 p-0 relative",

            /* botão do dia */
            // day: "w-full h-9",
            day_button: "w-full h-9 p-0",

            /* navegação */
            button_previous: "left-1",
            button_next: "right-1",

            /* mês / ano */
            month_caption: "capitalize flex justify-center pt-1 items-center",
          }}
        />
      </div>
      {selectedDate && (
        <div className="flex flex-row items-center gap-2 overflow-x-auto border border-solid p-5 [&::-webkit-scrollbar]:hidden">
          {TIME_LIST.map((time) => (
            <Button
              key={time}
              variant={time === selectedTime ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleSelectedTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      )}

      {selectedDate && selectedTime && (
        <div>
          <Card className="p-5">
            <CardContent>
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{name}</h2>
                <p className="font-bold">
                  {price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Data:</p>
                <p>
                  {format(selectedDate, "dd'/'MM'/'yyyy", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Horário:</p>
                <p>{selectedTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Barbearia:</p>
                <p>{barbershop}</p>
              </div>
            </CardContent>
          </Card>
          <SheetClose asChild>
            <SheetFooter>
              <Button type="submit" onClick={handleCreateBooking}>
                Confirmar Reserva
              </Button>
            </SheetFooter>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
};

export default ReservationSheet;
