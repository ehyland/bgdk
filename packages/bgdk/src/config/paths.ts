import path from "path";

export const root = path.resolve(process.cwd());
export const src = path.resolve(root, "src");
export const dist = path.resolve(root, "dist");
export const entry = path.resolve(root, "src/index.tsx");
export const entryRelative = "./" + path.relative(root, entry);
