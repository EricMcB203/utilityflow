import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const {
    data: existingBatch,
  } = await supabase
    .from("batches")
    .select("*")
    .limit(1)
    .single();

  const { error } =
    await supabase
      .from("carts")
      .insert([
        {
          cart_number:
            body.cart_number,
          hotel_name:
            body.hotel_name,
          current_weight:
            body.current_weight,
          status:
            body.status || "Idle",
          batch_id:
            existingBatch?.id ?? null,
        },
      ]);

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  if (existingBatch) {
    await supabase
      .from("machine_assignments")
      .insert([
        {
          batch_id:
            existingBatch.id,
          washer_name:
            "Washer-01",
          dryer_name:
            "Dryer-01",
          status: "Queued",
        },
      ]);

    await supabase
      .from("production_queue")
      .insert([
        {
          batch_id:
            existingBatch.id,
          queue_stage:
            "Wash Queue",
          status: "Queued",
        },
      ]);
  }

  await supabase
    .from("chain_of_custody")
    .insert([
      {
        event_text: `${body.cart_number} created for ${body.hotel_name}`,
      },
      {
        event_text: `${body.cart_number} assigned to batch ${existingBatch?.batch_number}`,
      },
      {
        event_text: `${body.cart_number} assigned machine resources`,
      },
      {
        event_text: `${body.cart_number} added to production queue`,
      },
    ]);

  return NextResponse.json({
    success: true,
  });
}
