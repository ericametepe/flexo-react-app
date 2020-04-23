import React,{Component} from "react";
import {Control, Errors, Form} from "react-redux-form";
import {Button} from "react-bootstrap";
import SearchResult from "./SearchResultComponent";



class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            valueSite: '',
            floorsOptions:[],
            spacesOptions: [],
            displayResult:false,
            resultDesk:[]
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.updateFloorOptions=this.updateFloorOptions.bind(this);
        this.updateSpaceOptions=this.updateSpaceOptions.bind(this);
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
        let {desks} =this.props;

        this.setState({
            resultDesk:[]
        });

        console.log(`Desks from pros : ${JSON.stringify(desks)}`);


        let result = desks.filter(desk => values.spaceId.localeCompare(desk.spaceId)===0)
            .map(desk => Object.assign(desk,values));

        alert('Before: ' + 'resultDesk='+ JSON.stringify(this.state.resultDesk) +'values :'+JSON.stringify(values));

        this.setState({
            displayResult:true,
            resultDesk : result
        });

        Object.assign(values,{});
        //Object.assign(result,{});

        alert('After: ' +'resultDesk='+ JSON.stringify(this.state.resultDesk) +'values :'+JSON.stringify(values));
    }



    render() {

        if (this.props && this.props.errSites !== null) {
            return (<div>
                <div className="alert alert-danger" role="alert">
                    {this.props.err} </div> <p> {this.props.err}</p> </div>);
        } else {
            return (
                <div>
                    <Form  model="searchTerm" onSubmit={(values)=>this.handleSubmit(values)} >
                        <label>Choose the site</label>
                        <Control.select model=".siteId" name="siteId" onChange={(event)=>this.updateFloorOptions(event)} >
                            {this.props.sites.map(site =>
                                <option key={site.name} value={site.id} > {site.name}</option>
                            )}
                        </Control.select>
                        <Control.select model=".floorId" name="floorId"  onChange={(event)=>this.updateSpaceOptions(event)}>
                          {this.state.floorsOptions.map(floor =>
                                <option key={floor.id} value={floor.id}> {floor.num}</option>
                            ).concat(<option key="default" value=""> Choose the floor</option>)}
                        </Control.select>

                        <Control.select model=".spaceId" name="spaceId">
                            {this.state.spacesOptions.map(space=>
                            <option key={space.id} value={space.id} >{space.num}</option>
                            ).concat(<option key="default" value="">Choose a space</option>)}
                        </Control.select>



                        <Button variant="primary" type="submit"> <i className="fa fa-search-minus"></i></Button>
                    </Form>
                    <SearchResult  found={this.state.displayResult} items={this.state.resultDesk}
                                   postSit={this.props.postSit}
                                   sittings={this.props.sittings}
                                   releaseSit={this.props.releaseSit}/>
                </div>)


        }

    }

}

export default SearchForm;
