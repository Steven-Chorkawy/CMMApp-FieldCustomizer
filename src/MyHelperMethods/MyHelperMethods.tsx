import { spfi, SPFI, SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/security";

let _sp: SPFI;

export const getSP = (context?: any): SPFI => {
    if (_sp === undefined && context !== null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};

export const GetActiveCommitteeMembers = async (committeeName: string): Promise<Number> => {
    let members = await getSP().web.lists.getByTitle(committeeName).items.filter("OData__Status eq 'Successful'")();
    debugger;
    let memberCount = members.length;
    return memberCount;
} 