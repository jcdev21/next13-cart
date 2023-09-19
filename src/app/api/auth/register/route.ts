import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

const { json: jsonResponse } = NextResponse;

export const POST = async (request: Request) => {
  try {
    const { name, email, password } = await request.json();

    const isUserExisted = await prisma.user.findUnique({ where: { email } });

    if (isUserExisted) {
      return jsonResponse(
        {
          message: 'Email already exist'
        },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({ data: { name, email, password: await hash(password, 10) } });

    const { password: _, ...restUser } = user;

    return jsonResponse(
      {
        message: 'Successfully registered user',
        data: restUser
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
};
