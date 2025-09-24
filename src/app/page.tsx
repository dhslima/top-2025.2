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
import { MenuIcon } from "lucide-react";

import Header from "./_components/header";

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
      {/*Busca rápida*/}
      {/*Banner*/}
      {/*Agendamentos*/}
      {/*Recomendados*/}
      {/*Populares*/}
    </div>
  );
}
