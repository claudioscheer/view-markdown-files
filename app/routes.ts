import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("new", "routes/new.tsx"),
  route("edit/:id", "routes/edit.tsx"),
  route("view/:id", "routes/view.tsx"),
] satisfies RouteConfig;
