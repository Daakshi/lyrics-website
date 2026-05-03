import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findFirst({
      where: { username },
    });

    if (!admin) {
      // Return the same message for missing user and wrong password
      // to prevent username enumeration
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Plain-text comparison (upgrade to bcrypt if you add hashing in future)
    if (admin.password !== password) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[admin-login] Error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
