import { createServerClient, type CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Special helper for Express environment
export const createClient = (req: any, res: any) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          const cookies = req.headers.cookie || '';
          return cookies.split(';').map(c => {
            const [name, ...value] = c.trim().split('=');
            return { name, value: value.join('=') };
          });
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.cookie(name, value, options);
            });
          } catch (error) {
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  );
};
