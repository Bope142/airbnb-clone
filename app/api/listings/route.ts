import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (req: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const body = await req.json();
    console.log(body);
    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      description,
      title,
    } = body;
    Object.keys(body).forEach((value: any) => {
      if (!body[value]) return NextResponse.error();
    });

    const listing = await prisma.listing.create({
      data: {
        category,
        locationValue: location.value,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price: parseInt(price, 10),
        description,
        title,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {}
};
