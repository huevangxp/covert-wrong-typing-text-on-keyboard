import { serverSupabaseClient } from "#supabase/server";
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
