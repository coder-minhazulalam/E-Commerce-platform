const CDN_BASE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";

export const LOOKBOOK_CUTS = [
  "hf_20261108_190717_6580d844-f3b0-4240-8b4a-239355685fc9.png",
  "hf_20261111_034030_a9171bb1-0b34-4468-9a9e-f451d79b8429.png",
  "hf_20261111_034045_5a78f1ff-8dea-4054-85bc-60a28a4cc434.png",
  "hf_20261111_034059_24eecc7c-e8b7-4b9c-b58c-b862b1261e87.png",
  "hf_20261111_034112_5aa3a76f-7e92-48bb-b93d-ec3a35be2494.png",
  "hf_20261111_034123_ce28dc23-bd91-40ba-95e6-7a09442a865f.png",
  "hf_20261111_034137_abed307a-bcb4-4192-82e9-6ec122a80820.png",
  "hf_20261111_034150_fc1776ff-a8d6-4060-a8af-1afedfdfc563.png",
  "hf_20261111_034202_62b7ffb7-14f5-4dfc-87fe-83c6d9ee6134.png",
] as const;

export function imageProxyUrl(file: string, width: number): string {
  const source = `${CDN_BASE}${file}`;
  return `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(source)}&w=${width}&q=85`;
}

export function lookbookImage(index: number, width: number): string {
  const file = LOOKBOOK_CUTS[index];
  if (!file) {
    throw new RangeError(`Unknown lookbook image index: ${index}`);
  }
  return imageProxyUrl(file, width);
}
