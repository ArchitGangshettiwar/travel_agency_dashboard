import { type RouteConfig, route, layout, prefix } from "@react-router/dev/routes";

export default [
    route("sign-in", "routes/route/sign-in.tsx"),
    layout('routes/admin/admin-layout.tsx',[
     route("dashboard", "routes/admin/dashboard.tsx", { loader: () => import('./routes/admin/dashboard').then(m => m.ClientLoader) }),
        route("all-users", "routes/admin/all-users.tsx"),
    ], { 
        loader: () => import('./routes/admin/admin-layout').then(m => m.clientLoader)
    }),
  
] satisfies RouteConfig;
