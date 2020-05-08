import React from "react";

export const locateUserActions=(elements, userId)=>elements.filter((e)=>e.userId.localeCompare(userId)===0);
export const locateUserAction=(elements, userId)=>elements.find(e=>e.userId.localeCompare(userId)===0);
export const locateElemById=(elements, id)=>elements.find(e=>e.id.localeCompare(id)===0);
export const locateElemsById=(elements, id)=>elements.filter(e=>e.id.localeCompare(id)===0);

export const onlyUnique= (value, index, self) => self.indexOf(value) === index;
export const  nbUsers= (elements) => elements.map(r=>r.userId).filter(onlyUnique).length;
export const locateUserLastAction=(elements, userId)=>locateUserActions(elements, userId).sort((a, b) => a.id>b.id?-1:1)[0];
export const isBusy=(sittings, deskId)=> sittings.some(sit=> sit.deskId.localeCompare(deskId)===0 && sit.end===null && sit.start!==null);
export const findBusyDeskBy=(sittings, deskId)=> sittings.find(sit=> sit.deskId.localeCompare(deskId)===0 && sit.end===null && sit.start!==null);



export const fullDeskInfo=(deskId, desks, spaces, floors,sites, sittings=[])=>{
    let fdesk= locateElemById(desks, deskId);
    fdesk.spaceNum =locateElemById(spaces,fdesk.spaceId).num;
    fdesk.floorId =locateElemById(spaces,fdesk.spaceId).floorId;
    fdesk.floorNum =locateElemById(floors,fdesk.floorId).num;
    fdesk.siteId =locateElemById(floors,fdesk.floorId).siteId;
    fdesk.siteName =locateElemById(sites,fdesk.siteId).name;
    fdesk.adresse =locateElemById(sites,fdesk.siteId).adresse;
    fdesk.isBusy=isBusy(sittings, deskId);
    return fdesk;
};


function DeskStatusCounter(desks,sittings) {
    let busyCount= desks.filter(d=>!isBusy(sittings,d)).length;
    let freeCount= desks.filter(d=>!isBusy(sittings,d)).length;
    return  {busyCount,freeCount};
}
const reducerAdd = (accumulator, currentValue) => (accumulator + currentValue);
export const AVG_RATINGS = (ratings) => formatNumber(ratings &&ratings.length && ratings.length>0?
    ratings.map(r => parseInt(r.rate,0)).reduce((a, b) => (a + b ),0) / ratings.length:0);
export const formatNumber= (value)=>  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(value);
export const count_reports=(reports, userId)=>
    formatNumber((reports && reports.length)? (reports.filter(r=>r.userId.localeCompare(userId)===0)).length:0,2);
export const count_ratings=(ratings, userId)=>
    formatNumber((ratings && ratings.length)? (ratings.filter(r=>r.userId.localeCompare(userId)===0)).length:0,2);












