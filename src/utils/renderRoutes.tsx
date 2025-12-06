import { Route } from "react-router-dom";

export function renderRoutes(routes: any[]) {
  return routes.map((route) => {
    const { path, element, children, index } = route;

    return (
      <Route key={path || "index"} path={path} element={element} index={index}>
        {children && children.length > 0 ? renderRoutes(children) : null}
      </Route>
    );
  });
}
