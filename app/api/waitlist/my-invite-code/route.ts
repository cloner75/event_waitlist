import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(
      'https://dopin-backend-qpxxo.ondigitalocean.app/v1/invite/client/my-invite-code',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: body.token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Unknown error',
          statusCode: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: 'Internal Proxy Error', error: `${err}` },
      { status: 500 }
    );
  }
}
