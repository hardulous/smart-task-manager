import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  const PendingTask = await Topic.countDocuments({ pending: true });

  const CompletedTask = await Topic.countDocuments({ pending: false });
  return NextResponse.json({ PendingTask, CompletedTask }, { status: 200 });
}
