import { HttpClient } from "@angular/common/http";
import { isArray } from "@datorama/akita";
import { firstValueFrom, from, lastValueFrom, of } from "rxjs";
import { environment } from "src/environments/environment";

export class Chatchable {
    data: any = {};
    /**
     *
     */
    constructor(private hClient: HttpClient) {

    }
    async get<T>(key: string, path: string, refresh?: boolean): Promise<T> {
        if (!refresh) {
            var data = this.data[key];
            if (data) return lastValueFrom(of(data));
        }

        data = await lastValueFrom(this.hClient.get<T>(path));
        this.data[key] = data;

        return lastValueFrom(of(data));
    }
    setChatche<T>(key: string, data: T) {
        this.data[key] = data;
    }
    getData<T>(key: string) {
        return this.data[key] as T;
    }
    getFilter<T>(key: string, filterArg: (el: T) => boolean): T[] {
        return (this.data[key] ?? []).filter(filterArg) as T[];
    }
    reset() {
        this.data = {};
    }
}