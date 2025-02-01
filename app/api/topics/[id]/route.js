import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, priority, dueDate } = await req.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description, priority, dueDate });
  return NextResponse.json({ message: "Topic Is Updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
