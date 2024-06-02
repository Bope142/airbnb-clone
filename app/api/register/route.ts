import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {}
};
