import { NextResponse } from 'next/server';
import { registerAccount } from '@/lib/actions/register';

export async function GET() {
  try {
    const formData = new FormData();
    formData.append('email', `test-${Date.now()}@university.edu`);
    formData.append('password', 'password123');
    const res = await registerAccount(formData); if(res?.error) throw new Error(res.error);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
