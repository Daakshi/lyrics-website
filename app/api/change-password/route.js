import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { oldPassword, newPassword } = await req.json();

    const admin = await prisma.admin.findFirst();
    if (!admin || admin.password !== oldPassword) {
      return Response.json({ success: false, message: "Invalid old password" });
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: newPassword },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
