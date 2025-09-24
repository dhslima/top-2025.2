import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MenuIcon, SearchIcon } from "lucide-react";

import Header from "./_components/header";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import BookingItem from "./_components/booking-item";

export default function Home() {
  return (
    <div>
      {/*Cabeçalho*/}
      <Header />
      {/*Texto inicial*/}
      <div className="p-5">
        <p className="text-xl font-bold">Olá, David!</p>
        <p className="text-sm">Quarta-feira, 24 de setembro de 2025</p>
      </div>
      {/*Buscar*/}
      <div className="flex flex-row items-center gap-4 px-5">
        <Input placeholder="Buscar serviços" />
        <Button size={"icon"}>
          <SearchIcon />
        </Button>
      </div>
      {/*Busca rápida*/}
      {/*Banner*/}
      <div className="relative mt-6 h-[150px] w-full p-5">
        <Image
          src="/banner-01.png"
          alt="Banner"
          fill
          className="rounded-xl object-contain"
        />
      </div>
      {/*Agendamentos*/}
      <h3 className="p-5 text-sm font-semibold text-gray-400 uppercase">
        Agendamentos
      </h3>
      <BookingItem />
      {/*Recomendados*/}
      {/*Populares*/}
    </div>
  );
}
