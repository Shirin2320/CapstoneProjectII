import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getServerURL() {
  return process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3123"
    : process.env.NEXT_PUBLIC_SERVER_URL;
}

export function buildURL(route: string) {
  return getServerURL() + route;
}
