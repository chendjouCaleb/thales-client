import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "@app/http";
import {Member, MemberJobInfo} from "@entities/member";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {MemberAddModel } from "@app/models";
import {Space} from "@entities/space";

@Injectable({
  providedIn: 'root'
})
export class MemberHttpClient {
  private url = `${SERVER_URL}/members`;

  private _memberAdd = new Subject<Member>();
  get memberAdd(): Observable<Member> {
    return this._memberAdd.asObservable()
  }

  private _memberDelete = new Subject<Member>();
  get memberDelete(): Observable<Member> {
    return this._memberDelete.asObservable()
  }

  private _memberEdit = new Subject<Member>();
  get memberEdit(): Observable<Member> {
    return this._memberEdit.asObservable()
  }

  constructor(private _httpClient: HttpClient) {}

  async listAsync(params: any = {}): Promise<Member[]> {
    const call = this._httpClient.get<Member[]>(`${this.url}`, {params});
    const items = await firstValueFrom(call);
    return items.map(i => new Member(i));
  }

  async getByIdAsync(id: number): Promise<Member> {
    const call = this._httpClient.get<Member>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new Member(value);
  }

  containsNameAsync(name: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/name`, {params: {name}});
    return firstValueFrom(call);
  }

  async addAsync(space:Space, model: MemberAddModel): Promise<Member> {
    const params = { spaceId: space.id };
    const call = this._httpClient.post<Member>(`${this.url}`, model, {params});
    const value = await firstValueFrom(call);
    const member = new Member(value);
    this._memberAdd.next(member);
    return member;
  }

  async deleteAsync(member: Member): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${member.id}`);
    await firstValueFrom(call);
    this._memberDelete.next(member);
  }

  async changeJobInfoAsync(member: Member, jobInfo: MemberJobInfo): Promise<void> {
    const call = this._httpClient.put(`${this.url}/${member.id}/job-info`, jobInfo);
    await firstValueFrom(call);
    member.jobInfo = jobInfo
    this._memberEdit.next(member)
  }

  async toggleAdminAsync(member: Member): Promise<void> {
    const call = this._httpClient.put(`${this.url}/${member.id}/admin`, {});
    await firstValueFrom(call);
    member.isAdmin = !member.isAdmin;
    this._memberEdit.next(member)
  }

  async toggleLockAsync(member: Member): Promise<void> {
    const call = this._httpClient.put(`${this.url}/${member.id}/lock`, {});
    await firstValueFrom(call);
    member.isLocked = !member.isLocked;
    this._memberEdit.next(member)
  }


}
