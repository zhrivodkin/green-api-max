export default function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
};
