import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/generated/prisma";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="rounded">
      <CardContent className="flex flex-row items-center gap-4">
        <div>
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="font-bold">{service.name}</p>
          <p className="text-gray-400">{service.description}</p>
          <div className="flex flex-row items-center justify-between">
            <span>R$ 50,00</span>
            <Button variant={"outline"}>Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
