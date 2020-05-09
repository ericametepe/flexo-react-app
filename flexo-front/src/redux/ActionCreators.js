import {
    ADD_DESKS,
    ADD_FLOORS,
    ADD_SITES,
    ADD_SPACES,
    DESKS_FAILED,
    FLOORS_FAILED,
    LOADING_DESKS,
    LOADING_FLOORS,
    LOADING_SPACES,
    SITES_FAILING,
    SITES_LOADING,
    SPACES_FAILED,
    ADD_SIT,
    SITS_FAILING,
    FETCH_SITS,
    SITS_LOADING,
    UPDATE_SITTING,
    CREATE_RATING,
    CREATE_REPORT,
    CREATE_FAVORITE,
    LOADING_FAVS,
    READ_FAVORITES,
    READ_FAVSFAILED,
    LOADING_REPORTS,
    READ_REPORTS,
    REPORTS_FAILED,
    RATE_LOADING,
    FETCH_RATINGS,
    DELETE_FAVORITE,
    READ_NOTIFS,
    NOTIFS_FAILED,
    UPDATE_NOTIF,
    CREATE_NOTIFS
} from "./ActionTypes";
import {baseUrl} from "./baseUrl";

export const sitesLoading= ()=> ({
     type: SITES_LOADING
});

export const  addSites= (sites) => ({
    type: ADD_SITES,
    payload: sites
});

export const sitesFailed=  (errMsg) => ({
    type: SITES_FAILING,
    payload:errMsg
});

export const fetchSites = ()=> dispatch =>{
    dispatch(sitesLoading());

    return fetch(baseUrl + "sites")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(sites => dispatch(addSites(sites)))
        .catch(error => dispatch(sitesFailed(error.message)));
};

const floorLoading=()=>({
    type:LOADING_FLOORS
});

const addFloors= (floors)=> ({
    type : ADD_FLOORS,
    payload: floors
});

const floorFailed=(message)=>({
    type:FLOORS_FAILED,
    payload:message
})



export const fetchFloors = ()=> dispatch =>{
    dispatch(floorLoading());

    return fetch(baseUrl + "floors")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(sites => dispatch(addFloors(sites)))
        .catch(error => dispatch(floorFailed(error.message)));
};

const spaceLoading= ()=> ({
   type: LOADING_SPACES
});

const addSpaces=(spaces) => ({
    type:ADD_SPACES,
    payload:spaces
});

const spacesFailed= (message) => ({
    type:SPACES_FAILED,
    payload: message
})

export const fetchSpaces = ()=> dispatch =>{
    dispatch(spaceLoading());

    return fetch(baseUrl + "spaces")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(spaces => dispatch(addSpaces(spaces)))
        .catch(error => dispatch(spacesFailed(error.message)));
};

const deskLoading=()=> ({
    type:LOADING_DESKS
});

const addDesks=(desks) =>( {
   type:ADD_DESKS,
   payload:desks
});

const  deskFailed= (message) => ({
    type:DESKS_FAILED,
    payload : message
});

export const fetchDesks = ()=> dispatch =>{
    dispatch(deskLoading());

    return fetch(baseUrl + "desks")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(desks => dispatch(addDesks(desks)))
        .catch(error => dispatch(deskFailed(error.message)));
};

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


export const addSit= (sit)=>({
     type : ADD_SIT,
     payload: sit
});

export function locateUser() {
    let user = localStorage.userId;
    if (!user || user === null) {
        user = create_UUID();
        localStorage.userId = user;
    }
    return user;
}

const addNotif=(response)=>( {
    type:CREATE_NOTIFS,
    payload:response
});

export const postSit = (siteId,floorId,spaceId,deskId) => dispatch => {
    const newSit = {
        siteId: siteId,
        floorId: floorId,
        spaceId: spaceId,
        deskId: deskId
    };
    newSit.start = new Date().toISOString();
    newSit.end = null;
    let user = locateUser();
    newSit.userId=user;

    return fetch(baseUrl + "sits", {
        method: "POST",
        body: JSON.stringify(newSit),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(addSit(response))
            let newNotif = Object.assign({},response);
            newNotif.type=ADD_SIT;
            newNotif.nStart=new Date().toISOString();
            newNotif.nEnd=null;
            dispatch(addNotif(newNotif));
        })
        .catch(error => {
            console.log("post sits", error.message);
            alert("Your seat could not be posted\nError: " + error.message);
        });
};

const updateSitting=(response)=> ({
    type:UPDATE_SITTING,
    payload:response
});

export const releaseSit = (sitting) => dispatch => {
    let upSitting={};
    Object.assign(upSitting,sitting);
    upSitting.end=new Date().toISOString();
    let url= `${baseUrl}/sits/${upSitting.id}`;

    return fetch(baseUrl + "sits/"+upSitting.id, {

        method: "PUT",
        body: JSON.stringify(upSitting),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(updateSitting(response));
            let newNotif = Object.assign({},response);
            newNotif.type=UPDATE_SITTING;
            newNotif.nStart=new Date().toISOString();
            newNotif.nEnd=null;
            dispatch(addNotif(newNotif));
        })
        .catch(error => {
            console.log("put sits", error.message);
            alert("Your seat could not be updated: " + error.message);
        });
};

const addRating=(response)=> ({
    type:CREATE_RATING,
    payload: response
});

export const rate = (rating) => dispatch => {
    let newRate={};
    Object.assign(newRate,rating);
    newRate.date=new Date().toISOString();
    newRate.userId=locateUser();


    return fetch(baseUrl + "rates", {
        method: "POST",
        body: JSON.stringify(newRate),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(addRating(response)))
        .catch(error => {
            console.log("post rate", error.message);
            alert("Your seat could not be rated: " + error.message);
        });
};

const  addReporting=(response) => ({
    type:CREATE_REPORT,
    payload:response
});

export const report = (reporting) => dispatch =>{
    let newReport= {};
    Object.assign(newReport, reporting);
    newReport.userId = locateUser();
    newReport.date= new Date().toISOString();

    return fetch(baseUrl + "reports", {
        method: "POST",
        body: JSON.stringify(newReport),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(addReporting(response)))
        .catch(error => {
            console.log("post rate", error.message);
            alert("Your report can be saved: " + error.message);
        });


};

const createFavorite= (response) => ({
    type:CREATE_FAVORITE,
    payload:response
});

export const addFav = (fav) => dispatch =>{
    let newFav= {};
    Object.assign(newFav, fav);
    newFav.userId = locateUser();
    newFav.date= new Date().toISOString();

    return fetch(baseUrl + "favorites", {
        method: "POST",
        body: JSON.stringify(newFav),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(createFavorite(response));
                let newNotif = Object.assign({},response);
                newNotif.type=CREATE_FAVORITE;
                newNotif.nStart=new Date().toISOString();
                newNotif.nEnd=null;
                dispatch(addNotif(newNotif));
            })
        .catch(error => {
            console.log("post favorite", error.message);
            alert("Your post favorite cannot be saved: " + error.message);
        });


};

const  deleteFavorite=(response) => ({
    type:DELETE_FAVORITE,
    payload:response
})

export const deleteFav=(idFav) => dispatch =>{
    
    fetch(baseUrl+"favorites/"+idFav,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response=>{
        if (response.status===200){
            return response
        }else {
            let error = new Error(
                "Error " + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    }).then(dispatch(deleteFavorite(idFav)))
        .catch(error => {
        console.log("delete favorite", error.message);
        alert("Your  favorite deletion cannot be completed: " + error.message);
    });

};

const sitsLoading= () => ({
    type:SITS_LOADING

});

const addSits=(sits)=> ({
    type: FETCH_SITS,
    payload:sits
});

const sitsFailed=(message) =>({
    type:SITS_FAILING,
    payload:message
});

export const fetchSits = ()=> dispatch =>{
    dispatch(sitsLoading());

    return fetch(baseUrl + "sits")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(sits => dispatch(addSits(sits)))
        .catch(error => dispatch(sitsFailed(error.message)));
};

const  favLoading= ()=> ({
        type:LOADING_FAVS
});

const readFavs=(favs) =>({
    type: READ_FAVORITES,
    payload:favs
});

const readFavsFailed= (message)=> ({
    type: READ_FAVSFAILED,
     payload:message
});

export const fetchFavorites = ()=> dispatch =>{
    dispatch(favLoading());

    return fetch(baseUrl + "favorites")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(favs => dispatch(readFavs(favs)))
        .catch(error => dispatch(readFavsFailed(error.message)));
};

const  reportLoading=()=> ({
    type:LOADING_REPORTS
});

const readReports=(reports)=>( {
    type:READ_REPORTS,
    payload:reports
});

const readReportsFailed=(message)=> ({
    type:REPORTS_FAILED,
    payload:message
});

export const fetchReports = ()=> dispatch =>{
    dispatch(reportLoading());

    return fetch(baseUrl + "reports")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(reports => dispatch(readReports(reports)))
        .catch(error => dispatch(readReportsFailed(error.message)));
};

const ratingLoading=()=> ({
    type:RATE_LOADING
});

const readRatings=(data)=> ({
    type:FETCH_RATINGS,
    payload: data
});

export const fetchRatings = ()=> dispatch =>{
    dispatch(ratingLoading());

    return fetch(baseUrl + "rates")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(data => dispatch(readRatings(data)))
        .catch(error => dispatch(readReportsFailed(error.message)));
};

const  readNotifs=() =>({
   type:READ_NOTIFS
});

const  readNotifsFailed=(message)=> ({
    type:NOTIFS_FAILED,
    payload:message
});

export const fetchNotifs=()=>dispatch=>{
    dispatch(readNotifs());
}


export const fetchNotifsOld=()=>dispatch=>{

    return fetch(baseUrl + "notifs")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(data => dispatch(readNotifs(data)))
        .catch(error => dispatch(readNotifsFailed(error.message)));
};

const  updateNotif=(response) =>( {
    type:UPDATE_NOTIF,
    payload:response
});

export const ackNotifs = (notifs) => dispatch => {
    notifs.forEach(upNotif=>{
        upNotif.nEnd=new Date().toISOString();
        dispatch(updateNotif(upNotif));
    })
};



