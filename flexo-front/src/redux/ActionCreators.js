import {
    ADD_DESKS,
    ADD_FLOORS,
    ADD_SITES, ADD_SPACES, DESKS_FAILED,
    FLOORS_FAILED, LOADING_DESKS,
    LOADING_FLOORS,
    LOADING_SPACES,
    SITES_FAILING,
    SITES_LOADING, SPACES_FAILED, ADD_SIT, SITS_FAILING, FETCH_SITS, SITS_LOADING
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


const addSit= (sit)=>({
     type : ADD_SIT,
     payload: sit
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
    let user = localStorage.userId;
    if (!user || user ===null){
        user=create_UUID();
        localStorage.userId=user;
    }
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
        .then(response => dispatch(addSit(response)))
        .catch(error => {
            console.log("post sits", error.message);
            alert("Your seat could not be posted\nError: " + error.message);
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



