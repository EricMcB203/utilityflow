import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function PATCH(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { error } =
      await supabase
        .from("production_queue")
        .update({
          queue_stage:
            body.queue_stage,
        })
        .eq("id", body.id);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unexpected server error",
      },
      {
        status: 500,
      }
    );
  }
}