import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("announcements", "routes/announcements.tsx"),
  route("announcements/:id", "routes/announcements.$id.tsx"),
] satisfies RouteConfig;
