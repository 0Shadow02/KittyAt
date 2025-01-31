export const runtime = "edge";

export const GET = async (req: Request) => {
  const { httpHandler } = await import("@/server");
  return httpHandler(req);
};

export const POST = async (req: Request) => {
  const { httpHandler } = await import("@/server");
  return httpHandler(req);
};