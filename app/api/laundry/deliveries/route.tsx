import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function PATCH(
  request: Request
) {
  const body =
    await request.json();

  const { error } =
    await supabase
      .from("deliveries")
      .update({
        delivery_status:
          body.delivery_status,
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
