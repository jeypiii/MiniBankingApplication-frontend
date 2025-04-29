import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
    getAuthToken(redirectToLogin: boolean = true): string {
      const authToken: string = sessionStorage.getItem("authToken") ?? '';
      if (!authToken) {
          alert("No user authentication token found. Please login again");

          if (redirectToLogin) {
            window.location.replace("/login");
          }
      }

      return authToken;
  }

  clearAuthToken(redirectToLogin: boolean = true) : void {
      sessionStorage.removeItem("authToken")
  }
}
