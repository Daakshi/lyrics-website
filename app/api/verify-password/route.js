import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { password } = await req.json();

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return Response.json({ success: false, message: "No admin configured" });
    }

    if (admin.password === password) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false, message: "Invalid password" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
