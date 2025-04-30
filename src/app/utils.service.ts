import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
    getCurUserId() {
      const userId: string = sessionStorage.getItem("userId") ?? '';
      console.log("USER ID", userId);
      if (!userId) {
          alert("No user id found. Please login again");
      }

      return parseInt(userId);
    }

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

  getServerUrl() {
    return 'http://localhost:8080';
  }
}
