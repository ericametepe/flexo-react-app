import React,{Component} from "react";
import {Control, Errors, Form} from "react-redux-form";
import SearchResult from "./SearchResultComponent";
import {locateElemById} from "./FlexoUtils";
import Button from "reactstrap/es/Button";



class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            valueSite: '',
            floorsOptions:[],
            spacesOptions: [],
            displayResult:false,
            resultDesk:[],
            activeSearch:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.updateFloorOptions=this.updateFloorOptions.bind(this);
        this.updateSpaceOptions=this.updateSpaceOptions.bind(this);
        this.updateDeskOptions=this.updateDeskOptions.bind(this);
    }

    updateDeskOptions = (event)=>{
        let optDesk = [...event.target.options].filter(opt=>opt.selected).map(opt=>opt.value);
        if (optDesk && this.state.floorsOptions
            && this.state.floorsOptions.length>0
            && this.state.spacesOptions &&this.state.spacesOptions.length>0){
            this.setState({
                activeSearch:true
            })
        }
    }

    updateFloorOptions= (event)=>{
        let optSite = [...event.target.options].filter(opt=>opt.selected).map(opt=>opt.value);
        console.log(`=========xhandleChangeSite ${JSON.stringify(optSite)}`);
        let floorsFound = this.props.floors.filter(f => f.siteId.localeCompare(optSite)===0);
        this.setState({
            floorsOptions:floorsFound,
            spacesOptions:[]
        })

    };

    updateSpaceOptions= (event)=>{
        let optFloor = [...event.target.options].filter(opt=>opt.selected).map(opt=>opt.value);
        console.log(`=========xhandleChangeSite ${JSON.stringify(optFloor)}`);
        let spacesFound = this.props.spaces.filter(s => s.floorId.localeCompare(optFloor)===0);

        this.setState({
            spacesOptions:spacesFound
        })

    };


    handleSubmit(values) {
        console.log(" desks======> :"+JSON.stringify(this.props.desks));
        let allDesk = this.props.desks;

        let test = (locateElemById(this.props.floors, values.floorId)) && locateElemById(this.props.sites,values.siteId);


        if (test){
        let result = allDesk.filter(d => values.spaceId.localeCompare(d.spaceId)===0)
            .filter(r=>r && r!==null)
            .map(d => {
                    d.floorId = values.floorId;
                    d.siteId = values.siteId;
                    return d;
                });


        let siteName = locateElemById(this.props.sites,values.siteId).name;
        let spaceNum= locateElemById(this.props.spaces,values.spaceId).num;
        let floorNum= locateElemById(this.props.floors, values.floorId).num;

         result =result.filter(r=>r && r!==null).map(r => {
            r.siteName=siteName;
            r.spaceNum=spaceNum;
            r.floorNum=floorNum;
            r.deskNum= locateElemById(this.props.desks,r.id).num;
            return r;

        });

        this.setState({
            displayResult:result.length>0,
            resultDesk : result,
            activeSearch:false,
            floorsOptions:[],
            spacesOptions: []

        });


        }
    }


    render() {
         const required = (val)=> val && val.length;
         const valid=(searchTerm) =>required(searchTerm.siteId) && required(searchTerm.floorId) && required(searchTerm.spaceId);
        if (this.props && this.props.errSites !== null) {
            return (<div>
                <div className="alert alert-danger" role="alert">
                    {this.props.err} </div> <p> {this.props.err}</p> </div>);
        } else {
            return (
                <div>
                    <Form  model="searchTerm" onSubmit={(values)=>this.handleSubmit(values)} >
                        <Control.select model=".siteId" name="siteId" onChange={(event)=>this.updateFloorOptions(event)}
                               validators={{required}}           >
                            {this.props.sites.map(site =>
                                <option key={site.id} value={site.id} > {site.name}</option>
                            ).concat(<option key="default" value=""> Choose the Site</option>)}
                        </Control.select>


                        <Control.select model=".floorId" name="floorId" validators={{required}}
                                        onChange={(event)=>this.updateSpaceOptions(event)}>
                          {this.state.floorsOptions.map(floor =>
                                <option key={floor.id} value={floor.id}> {floor.num}</option>
                            ).concat(<option key="default" value=""> Choose the floor</option>)}
                        </Control.select>

                        <Control.select model=".spaceId" name="spaceId" validators={{required}} onChange={(event => this.updateDeskOptions(event))}>
                            {this.state.spacesOptions.map(space=>
                            <option key={space.id} value={space.id} >{space.num}</option>
                            ).concat(<option key="default" value="">Choose a space</option>)}
                        </Control.select>

                        <Errors className="text-danger"  model="searchTerm.siteId" messages={{required:'Please select site'}} show="touched"> </Errors>
                        <Errors className="text-danger"  model="searchTerm.floorId" messages={{required:'Please select a floor'}} show="touched"> </Errors>
                        <Errors className="text-danger"   model="searchTerm.spaceId" messages={{required:'Please select space'}} show="touched"> </Errors>

                        <Button color="primary"  className="success" disabled={!this.state.activeSearch}> <i className="fa fa-search-minus"></i></Button>
                    </Form>
<hr/>
                    <SearchResult  found={this.state.displayResult}
                                   items={this.state.resultDesk}
                                   postSit={this.props.postSit}
                                   sittings={this.props.sittings}
                                   releaseSit={this.props.releaseSit}
                                   rate={this.props.rate}
                                   report={this.props.report}
                                   addFav={this.props.addFav}
                                   favorites={this.props.favorites}/>

                </div>

            )





        }

    }

}

export default SearchForm;
