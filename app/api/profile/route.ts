import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

import { defaultProfileData, type ProfileData } from '@/lib/profile';

export async function GET() {
  try {
    const result = await sql`SELECT data FROM profile WHERE id = 1`;
    if (result.rows.length > 0) {
      const profile = JSON.parse(result.rows[0].data) as ProfileData;
      return NextResponse.json(profile);
    } else {
      // Insert default if not exists
      await sql`INSERT INTO profile (id, data) VALUES (1, ${JSON.stringify(defaultProfileData)})`;
      return NextResponse.json(defaultProfileData);
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(defaultProfileData, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const profile: ProfileData = await request.json();
    await sql`UPDATE profile SET data = ${JSON.stringify(profile)} WHERE id = 1`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}