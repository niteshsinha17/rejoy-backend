export const IS_DEV = process.env.NODE_ENV === "development";

const CONF = {
  GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
  GHOST_ADMIN_API_KEY: process.env.GHOST_ADMIN_API_KEY,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

export const nconf = {
  get(key: keyof typeof CONF): string | undefined {
    return CONF[key];
  },
};

export const isServer = () => typeof window === "undefined";
