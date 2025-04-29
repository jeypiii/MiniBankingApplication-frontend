import { inject, Injectable } from '@angular/core';
import { Utilities } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  utilities: Utilities;
  constructor() {
    this.utilities = inject(Utilities);
  }

  async login(event: SubmitEvent) : Promise<boolean> {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    let loginForm = new FormData(form);
    let loginJson = {
        // "usernameOrEmail": loginForm.get("usernameOrEmail"),
        "usernameOrEmail": loginForm.get("email"),
        "password": loginForm.get("password")
    };

    return fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
               "Content-Type": "application/json",
        },
        body: JSON.stringify(loginJson),
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log(data);

                this.utilities.clearAuthToken();
                if (!data.accessToken) {
                    // We just cleared the token, so this should prompt an error
                    this.utilities.getAuthToken();
                    return false;
                }

                const bearerToken = "Bearer " + data.accessToken;

                sessionStorage.setItem("authToken", bearerToken);
                return true;
            });

            alert("Log In successful!");

            return true;
        } else {
            response.text().then(data => {
                alert("ERROR: " + data);
            })
            
            return false;
        }
    }).catch(() => false);
  }

  signout() {
      this.utilities.clearAuthToken();
  }
}
