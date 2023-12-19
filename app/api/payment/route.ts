import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { amount, candidateId } = await request.json();
    
    // Assuming 'prisma' is an instance of your PrismaClient
    // console.log(name,email,gender,age,timing);
    const resdata = await prisma.payment.create({
      data: {
        amount:amount,
        candidate: {
          connect: { id: candidateId }
        },
      },
    });
    // console.log(resdata);
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
