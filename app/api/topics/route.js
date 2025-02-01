import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, priority, dueDate } = await req.json();
  await connectMongoDB();
  await Topic.create({ title, description, priority, dueDate, pending: true });
  return NextResponse.json({ message: "Topic Is Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Is Deleted" }, { status: 200 });
}

export async function PATCH(req) {
  const id = req.nextUrl.searchParams.get("id");
  const pendingString = req.nextUrl.searchParams.get("pending");

  // Convert "true" or "false" string to a boolean value
  const pending = pendingString === "true";

  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { $set: { pending } });
  return NextResponse.json(
    { message: "Topic Status Is Changed" },
    { status: 200 }
  );
}
