import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Fetch the first admin
    let admin = await prisma.admin.findFirst();
    
    // If no admin exists yet, create a default one
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          username: "admin",
          password: "password123",
        },
      });
    }

    if (admin.username === username && admin.password === password) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
