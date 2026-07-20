import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received:", body);

    const { data, error } = await supabase
      .from("inspections")
      .insert([
        {
          asset_id: body.asset_id,
          inspection_type: body.inspection_type,
          result: body.result,
          notes: body.notes,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}