import { Injectable } from "@angular/core";
import { async } from "@angular/core/testing";
import { PushNotifications } from "@capacitor/push-notifications";

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  constructor() { }

  async init() {
    return;
    this.addListeners();
    this.getDeliveredNotifications();
  }

  addListeners = async () => {
    await PushNotifications.addListener("registration", (token) => {
      console.info("Registration token: ", token.value);
    });

    await PushNotifications.addListener("registrationError", (err) => {
      console.error("Registration error: ", err.error);
    });

    await PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push notification received: ", notification);
      }
    );

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log(
          "Push notification action performed",
          notification.actionId,
          notification.inputValue
        );
      }
    );
  };

  registerNotifications = async () => {
    let permStatus = await this.checkPermissions();

    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive == "granted") {
      await PushNotifications.register();
    }

  };

  checkPermissions = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    return permStatus;
  };

  getDeliveredNotifications = async () => {
    const notificationList =
      await PushNotifications.getDeliveredNotifications();
    console.log("delivered notifications", notificationList);
  };
}
