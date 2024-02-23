import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../feature/auth/services/auth.service";
import { firstValueFrom } from "rxjs";

export const AuthGuard = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    try {
        const user = await firstValueFrom(authService.me())
        if (user) {
            return true;
        } else {
            router.navigateByUrl('/login');
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification", error);
        router.navigateByUrl('/login');
        return false;
    }
}