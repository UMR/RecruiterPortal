import { Routes, Route } from '@angular/router';

export function cloneRoutes(routes: Routes) {
    const routesClone: Routes = [];
    for (let route of routes) {
        const routeClone = cloneRoute(route);
        routesClone.push(routeClone);
    }
    return routesClone;
}

function cloneRoute(route: Route) {
    const clone: Route = route.constructor();
    for (let prop in route) {
        if (route.hasOwnProperty(prop)) {
            if (prop === 'children') {
                clone[prop] = cloneRoutes(route.children);
            } else {
                clone[prop] = route[prop];
            }
        }
    }
    return clone;
}

export function removeUnauthorizeRoutes(config: Routes, userPermissions: string[]) {
    for (let route of config.slice()) {
        if (route.children) {
            removeUnauthorizeRoutes(route.children, userPermissions);
        }
        else if (!isRoutePermitted(route, userPermissions)) {
            const index = config.indexOf(route);
            config.splice(index, 1);
        }
    }
}

function isRoutePermitted(route: Route, userPermissions: string[]) {
    //const pathPermission = PERMISSIONS[route.path];
    //if (!pathPermission) {
    //    return true;
    //}
    //const hasPermission = !!userPermissions.find(up => up.toLowerCase() === pathPermission.toLowerCase());
    //if (hasPermission) {
    //    return true;
    //}
    //return false;
    return true;
}
