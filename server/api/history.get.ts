import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Get IP address
  const xForwardedFor = getRequestHeader(event, "x-forwarded-for");
  const ip = xForwardedFor
    ? xForwardedFor.split(",")[0]
    : event.node.req.socket.remoteAddress;

  const { data, error } = await client
    .from("translation_history")
    .select("*")
    .eq("ip_address", ip)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});
