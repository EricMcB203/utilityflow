import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function PATCH(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      data: queueItem,
      error: queueLookupError,
    } = await supabase
      .from("production_queue")
      .select("*")
      .eq("id", body.id)
      .single();

    if (queueLookupError) {
      return NextResponse.json(
        {
          error:
            queueLookupError.message,
        },
        { status: 500 }
      );
    }

    const { error } =
      await supabase
        .from("production_queue")
        .update({
          queue_stage:
            body.queue_stage,
        })
        .eq("id", body.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (
      body.queue_stage ===
      "Ready For Delivery"
    ) {
      const {
        data: existingDelivery,
      } = await supabase
        .from("deliveries")
        .select("*")
        .eq(
          "batch_id",
          queueItem.batch_id
        )
        .limit(1)
        .maybeSingle();

      if (!existingDelivery) {
        await supabase
          .from("deliveries")
          .insert([
            {
              batch_id:
                queueItem.batch_id,
              driver_name:
                "Driver-01",
              assigned_driver:
                "Driver-01",
              route_name:
                "South Fork Route",
              delivery_status:
                "Ready For Delivery",
            },
          ]);

        await supabase
          .from(
            "chain_of_custody"
          )
          .insert([
            {
              event_text:
                "Batch marked Ready For Delivery and delivery record created",
            },
          ]);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Unexpected server error",
      },
      { status: 500 }
    );
  }
}