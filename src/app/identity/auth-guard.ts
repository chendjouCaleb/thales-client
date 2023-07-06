import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "@app/identity/authentication.service";

export const IsAuthGuardFunc:CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isLogged) {
    return true;
  }
  router.navigateByUrl('/identity/login')
  return false;
}

export const IsNotAuthGuardFunc:CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(!authService.isLogged) {
    return true;
  }
  router.navigateByUrl('/admin')
  return false;
}
