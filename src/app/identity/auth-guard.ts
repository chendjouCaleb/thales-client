import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "@app/identity/authentication.service";

export const IsAuthGuardFunc:CanActivateFn = async () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (await authService.isLoggedAsync()) {
    return true;
  }
  router.navigateByUrl('/identity/login')
  return false;
}

export const IsNotAuthGuardFunc:CanActivateFn = async () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!await authService.isLoggedAsync()) {
    console.log('Your are not logged.')
    return true;
  }

  console.log('Your are logged. Redirect to /admin.')
  router.navigateByUrl('/admin')
  return false;
}
