import { spfi, SPFI, SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/security";
import { PnPClientStorage } from "@pnp/core";


let _sp: SPFI;
let _pnpClientStorage: PnPClientStorage;
export const PNP_COMMITTEE_STORAGE = "_MyPnPCommitteeStorageKey";

export const getClientStorage = (): PnPClientStorage => {
    if (_pnpClientStorage === undefined || _pnpClientStorage === null) {
        _pnpClientStorage = new PnPClientStorage();
    }
    return _pnpClientStorage;
}

export const getSP = (context?: any): SPFI => {
    if (_sp === undefined && context !== null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};

export const GetCommitteeLocalStorageKey = (committeeName: string): string => `${PNP_COMMITTEE_STORAGE}_${committeeName}`;

export const GetActiveCommitteeMembers = async (committeeName: string): Promise<Number> => {
    let output = await getClientStorage().local.getOrPut(GetCommitteeLocalStorageKey(committeeName), async () => {
        let activeMemberCount = (await getSP().web.lists.getByTitle(committeeName).items.filter("OData__Status eq 'Successful'")()).length;
        return Promise.resolve(activeMemberCount);
    });
    return output;
} 