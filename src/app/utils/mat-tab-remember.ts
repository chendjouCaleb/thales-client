import {Injectable} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {SessionStore} from "./session-store";
import {MatTabGroup} from "@angular/material/tabs";



export class MatTabGroupRemember {
  store: SessionStore;
  private tab: MatTabGroup;

  constructor(private key: string) {
    this.store = new SessionStore(this.key);
  }

  attach(tab: MatTabGroup) {
    this.tab = tab;
    this.tab.selectedIndexChange.subscribe(index => {
      this.selectedIndex = index;
    });
  }

  get selectedIndex(): number { return this.store.getItem('selectedIndex') ?? 0; }
  set selectedIndex(value: number) { this.store.setItem('selectedIndex', value); }


  clear() {
    this.store.clear();
  }

}




