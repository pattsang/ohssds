import { Directive, ViewContainerRef, Input, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private router: Router) { }

    ngOnInit() {
      const userRoles = this.authService.decodedToken.role as Array<string>;

      if (!userRoles) {
        this.viewContainerRef.clear();
      }

      if (this.authService.roleFromToken(this.appHasRole)){
        if (!this.isVisible) {

          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    }
}
