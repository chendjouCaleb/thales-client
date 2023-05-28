export class SessionStore {
  data : {[key: string]: any} =  {};
  constructor(public readonly name: string) {
    var value = sessionStorage.getItem(name);
    if(!value){
      sessionStorage.setItem(name, '{}');
    }else {
      this.data = JSON.parse(value);
    }
  }

  setItem(key: string, value: any) {
    this.data[key] = value;
    this.save()
  }

  removeItem(key: string) {
    this.data[key] = undefined;
    this.save();
  }

  clear() {
    this.data = {};
    this.save()
  }

  getItem<T>(key: string) : T{
    return this.data[key];
  }

  save() {
    sessionStorage.setItem(this.name, JSON.stringify(this.data))
  }
}
