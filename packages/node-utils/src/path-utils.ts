import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * Get the current directory of the caller file in ES modules.
 * @param url The `import.meta.url` of the caller file.
 * @returns The directory name.
 */
export function getDirnameWithMeta(url: string): string {
  return dirname(fileURLToPath(url));
}

/**
 * Join paths relative to the caller file in ES modules.
 * @param url The `import.meta.url` of the caller file.
 * @param paths The paths to join.
 * @returns The joined paths.
 */
export function joinWithMeta(url: string, ...paths: string[]): string {
  return join(getDirnameWithMeta(url), ...paths);
}
