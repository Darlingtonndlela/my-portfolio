import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { defaultProfileData, type ProfileData } from '@/lib/profile';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('data')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found
      throw error;
    }

    if (data) {
      return NextResponse.json(JSON.parse(data.data));
    } else {
      // Insert default
      const { error: insertError } = await supabase
        .from('profile')
        .insert({ id: 1, data: JSON.stringify(defaultProfileData) });

      if (insertError) throw insertError;
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
    const { error } = await supabase
      .from('profile')
      .upsert({ id: 1, data: JSON.stringify(profile) });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}