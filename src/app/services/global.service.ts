import { Injectable } from "@angular/core";
import { Share, ShareOptions } from "@capacitor/share";
import { Platform } from "@ionic/angular";
import {
  Filesystem,
  Directory,
  Encoding,
  WriteFileOptions,
  WriteFileResult,
} from "@capacitor/filesystem";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(private platform: Platform) { }

  async share(options: ShareOptions) {
    let isMobile = this.platform.is("capacitor");
    if (isMobile) {
      return await Share.share(options);
    }

    return null;
  }

  async writeFile(options: WriteFileOptions) {
    let file: WriteFileResult = {} as WriteFileResult;
    try {
      let option = typeof options == "object" ? options : null;
      let state = await Filesystem.checkPermissions();
      state = await Filesystem.requestPermissions();
      if (state.publicStorage === "prompt") {
      }

      if (state.publicStorage !== "granted") {
        throw new Error("User denied permissions!");
      }
      // alert("state: " + JSON.stringify(state.publicStorage));

      await Filesystem.requestPermissions();
      file = await Filesystem.writeFile({
        directory: Directory.ExternalStorage,
        data: options?.data,
        path: "tech/" + options?.path,
        ...option,
      });
      return file;
    } catch (error) {

      // alert("state: " + JSON.stringify(error));
      return file;
    }
  }
}
