import { filesystem } from "gluegun";
import reactSettings from "./react";
import reactNativeSettings from "./react-native";

/**
 * Platform enumerator
 */
export enum Platform {
  INVALID,
  MOBILE,
  WEB
}

/**
 * Get current project platform
 */
export function GetCurrentPlatform(): Platform {
  const packageJson = filesystem.read("./package.json", "json");

  if (packageJson) {
    if ("react-native" in packageJson.dependencies) {
      return Platform.MOBILE;
    } else if ("react" in packageJson.dependencies) {
      return Platform.WEB;
    }
  }
  return Platform.INVALID;
}

/**
 * Get platform settings
 */
export function GetSettings(
  commandName: string,
  platform: Platform = GetCurrentPlatform()
) {
  switch (platform) {
    case Platform.MOBILE:
      return reactNativeSettings[commandName];
    case Platform.WEB:
      return reactSettings[commandName];
    default:
      return null;
  }
}
