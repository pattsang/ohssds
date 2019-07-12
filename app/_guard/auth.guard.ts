import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService) {}

        canActivate(next: ActivatedRouteSnapshot): boolean {
            // const roles = next.firstChild.data['roles'] as Array<string>;
            // if (roles) {
            //     const match = this.authService.roleFromToken(roles);
            //     if (match) {
            //         return true;
            //     } else {
            //         this.router.navigate(['/search']);
            //         this.alertify.error('Not Authorized');
            //     }
            // }
            if (this.authService.loggedIn()){
                return true;
            }

            this.alertify.warning('Please Log in');
            this.router.navigate(['/search']);
            return false;
        }
}