import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@components/ui/carousel";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@components/ui/sheet";
import React, { useState } from "react";

export function Gallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <Sheet>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent role="list">
          {images.map((i, index) => (
            <CarouselItem key={i} className="basis-auto">
              <SheetTrigger asChild>
                <img
                  key={i}
                  src={i}
                  className="h-60 cursor-pointer rounded-md"
                  onClick={() => {
                    setCurrent(index);
                  }}
                />
              </SheetTrigger>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5.5" />
        <CarouselNext className="-right-5.5" />
      </Carousel>
      <SheetContent side="bottom" className="pt-14 pb-6 md:pt-14 md:pb-8">
        <SheetTitle className="sr-only">Images</SheetTitle>
        <Carousel
          opts={{
            align: "start",
            startIndex: current,
            dragFree: true,
          }}
        >
          <CarouselContent role="list" className="px-4 md:px-10">
            {images.map((i) => (
              <CarouselItem key={i} className="basis-auto content-center">
                <img
                  key={i}
                  src={i}
                  className="mx-3 max-h-[calc(100vh-135px)] rounded-md md:mx-5 md:max-h-[calc(100vh-160px)] md:max-w-[calc(100vw-20px)] md:max-w-[calc(100vw-160px)]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </SheetContent>
    </Sheet>
  );
}
