"use server";
import { metaOG } from "meta-og";
export default async function OG(url: string) {
  return await metaOG(url).catch((err) => {
    return { error: err };
  });
}
