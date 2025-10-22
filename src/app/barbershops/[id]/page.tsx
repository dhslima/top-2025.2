import { db } from "@/app/_lib/prisma";
import { redirect } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    redirect("/");
  }

  return (
    <div>
      <p>{params.id}</p>
    </div>
  );
};

export default BarbershopPage;
