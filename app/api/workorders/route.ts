import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const { error } = await supabase
    .from("work_orders")
    .insert([
      {
        asset_id: body.asset_id,
        work_type: body.work_type,
        priority: body.priority,
        status: body.status,
      },
    ]);

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}

export async function PATCH(
  request: Request
) {
  const body = await request.json();

  const { error } = await supabase
    .from("work_orders")
    .update({
      status: body.status,
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
