import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { amount, usersId} = await request.json();
    
    // Assuming 'prisma' is an instance of your PrismaClient
    // console.log(name,email,gender,age,timing);
    const resdata = await prisma.payment.create({
      data: {
        amount:amount,
        user: {
          connect: { id: usersId }
        },
      },
    });
    console.log(resdata);
    return NextResponse.json(
      {
        data: resdata,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
