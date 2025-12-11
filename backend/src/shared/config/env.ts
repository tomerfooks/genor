import { z } from 'zod';

/**
 * Environment Configuration Schema
 */
const envSchema = z.object({
  PORT: z.string().transform(Number).default('3001'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JSON_PLACEHOLDER_BASE_URL: z
    .string()
    .url()
    .default('https://jsonplaceholder.typicode.com'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

/**
 * Environment Configuration Type
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Load and validate environment configuration
 */
export function loadConfig(): EnvConfig {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment configuration:');
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
}

/**
 * Application configuration singleton
 */
export const config = loadConfig();
