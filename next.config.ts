import type { NextConfig } from "next";
const config: NextConfig = { output: "export", devIndicators: false, agentRules: false, turbopack: { root: process.cwd() } };
export default config;
