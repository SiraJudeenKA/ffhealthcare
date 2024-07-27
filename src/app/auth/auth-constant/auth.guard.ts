import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';


export const authGuard: CanActivateFn = () => {
    /**
     * Variable used to create the instance of shared serivce
     */
    const sharedService = inject(SharedService);
    /**
     * Variable used to create the instance of router
     */
    const router = inject(Router);
    if (sharedService?.currentUser)
        return true;
    else
        return router.createUrlTree(['']);
};