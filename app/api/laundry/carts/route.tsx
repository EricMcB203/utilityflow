import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const { data: plants } =
    await supabase
      .from("plant_capacity")
      .select("*");

  let selectedPlant = null;

  if (
    plants &&
    plants.length > 0
  ) {
    selectedPlant =
      plants.reduce(
        (lowest, current) => {
          const currentPct =
            current.current_load /
            current.max_capacity;

          const lowestPct =
            lowest.current_load /
            lowest.max_capacity;

          return currentPct <
            lowestPct
              ? current
              : lowest;
        }
      );
  }

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
            existingBatch?.id ??
            null,
        },
      ]);

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  if (selectedPlant) {
    await supabase
      .from("plant_capacity")
      .update({
        current_load:
          selectedPlant.current_load + 5,
      })
      .eq(
        "id",
        selectedPlant.id
      );
  }

  await supabase
    .from("chain_of_custody")
    .insert([
      {
        event_text: `${body.cart_number} created for ${body.hotel_name}`,
      },
      {
        event_text: `${body.cart_number} automatically routed to ${selectedPlant?.plant_name}`,
      },
      {
        event_text: `${body.cart_number} assigned to batch ${existingBatch?.batch_number}`,
      },
      {
        event_text: `${selectedPlant?.plant_name} load increased`,
      },
    ]);

  return NextResponse.json({
    success: true,
  });
}
