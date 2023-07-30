import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackbarLoaderTemplate} from "../snackbar-loader/snackbar-loader-template";

@Injectable({
  providedIn: 'root'
})
export class SnackbarLoader {
  constructor(private _snackbar: MatSnackBar) {}

  open(message: string) : MatSnackBarRef<any> {
    const data = {message}
    const snackbarRef = this._snackbar.openFromComponent(SnackbarLoaderTemplate, {data});
    return snackbarRef;
  }

   async wrap<T>(message: string, action: () => Promise<T>): Promise<T> {
    const loaderRef = this.open(message);
    try {
      const result = await action();
      loaderRef.dismiss();
      return result;
    }catch (e) {
      loaderRef.dismiss();
      throw e;
    }
  }
}
