import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Get IP address
  const xForwardedFor = getRequestHeader(event, "x-forwarded-for");
  const ip = xForwardedFor
    ? xForwardedFor.split(",")[0]
    : event.node.req.socket.remoteAddress || "unknown";

  const { error } = await client
    .from("translation_history")
    .delete()
    .eq("ip_address", ip);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
