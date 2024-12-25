export function interpolatePath(
  path: string,
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const paramRegex = /:([A-Za-z][A-Za-z0-9_]*)/g;
  const requiredParams = Array.from(path.matchAll(paramRegex)).map(
    (match) => match[1],
  );

  const missingParams = requiredParams.filter(
    (param): param is string => param !== undefined && !(param in params),
  );
  if (missingParams.length > 0) {
    throw new Error(
      `Missing required path parameters: ${missingParams.join(", ")}`,
    );
  }

  return path.replace(paramRegex, (_, paramName) => {
    const value = params[paramName as keyof typeof params];
    if (value === null || value === undefined) {
      throw new Error(
        `Path parameter "${paramName}" cannot be null or undefined`,
      );
    }
    return encodeURIComponent(String(value));
  });
}
