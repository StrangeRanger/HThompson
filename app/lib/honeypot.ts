interface HoneypotConfig {
  enabled: boolean;
  exactPaths: readonly string[];
  directoryPaths: readonly string[];
}

// Only reserve paths this application does not serve. Keep entries rooted,
// case-sensitive, and without trailing slashes.
const honeypotConfig: HoneypotConfig = {
  enabled: true,
  exactPaths: [
    "/.env",
    "/.env.local",
    "/.env.production",
    "/.env.production.local",
    "/.aws/credentials",
    "/.vscode/sftp.json",
    "/wp-login.php",
    "/wp-config.php",
    "/xmlrpc.php",
    "/phpinfo.php",
    "/info.php",
  ],
  directoryPaths: ["/.git", "/wp-admin", "/wp-includes"],
};

export function isHoneypotPath(
  pathname: string,
  config: HoneypotConfig = honeypotConfig,
): boolean {
  if (!config.enabled) return false;

  let path = pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    // Malformed encoding is not itself a trap; still check the literal path.
  }
  path = path.replace(/\/+$/, "");

  return (
    config.exactPaths.includes(path) ||
    config.directoryPaths.some(
      (directory) => path === directory || path.startsWith(`${directory}/`),
    )
  );
}
