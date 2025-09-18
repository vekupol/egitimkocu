import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = typeof body === "string" ? JSON.parse(body) : body;

    await addDoc(collection(db, "blogs"), {
      title: data.title,
      content: data.content,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Blog ekleme hatası:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
