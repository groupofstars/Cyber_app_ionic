import { Injectable } from "@angular/core";
import { App } from "@capacitor/app";

@Injectable({
  providedIn: "root",
})
export class DeeplinkService {
  constructor() {}

  checkAppLaunchUrl = async () => {
    const { url }: any = await App.getLaunchUrl();
  };

  async init() {
    this.checkAppLaunchUrl();
    App.addListener("appStateChange", ({ isActive }) => {
      console.log("App state changed. Is active?", isActive);
    });

    App.addListener("appUrlOpen", (data) => {
      console.log("App opened with URL:", data);
    });

    App.addListener("appRestoredResult", (data) => {
      console.log("Restored state:", data);
    });
  }
}
