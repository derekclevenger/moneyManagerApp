import { Injectable } from '@angular/core';
import {API_URL} from '../../constants';

@Injectable()
export class ConfigService {

    _apiURI: string;

    constructor() {
        this._apiURI = API_URL;
    }

    getApiURI() {
        return this._apiURI;
    }
}
