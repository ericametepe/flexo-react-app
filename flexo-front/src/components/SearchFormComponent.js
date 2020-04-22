import React,{Component} from "react";
import {Control, Form} from "react-redux-form";
import {Button} from "react-bootstrap";
import SearchResult from "./SearchResultComponent";
import DeskItem from "./DeskItemComponent";



class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            valueSite: '',
            valueFloor: '',
            valueSpace: '',
            displayResult:false,
            resultDesk:[],
            date: new Date()
        };
        this.handleChangeSite=this.handleChangeSite.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    updateOptions= (event)=>{
        let options = [...event.target.options].filter(opt=>opt.selected).map(opt=>opt.value);
        //this.setState({[event.target.name]:options});
        alert('A search was submitted: ' + JSON.stringify(options));

        console.log(`=========xhandleChangeSite ${JSON.stringify(options)}`);
    }

    handleChangeSite = (event) => {
        console.log(`=========xhandleChangeSite ${this.state.valueSite}`);
        this.setState({valueSite: event.target.value});
    }

    handleChangeFloor(event){
        this.setState({valueFloor: event.target.value});
    }

    handleChangeSpace(event){
        this.setState({valueSpace: event.target.value});
    }

    handleSubmit(values) {
        let resultDesk = this.props.desks.filter(desk => values.spaceId.localeCompare(desk.spaceId)===0)
            .map(desk => Object.assign(desk,values));
        this.setState({
            displayResult:!this.state.displayResult,
            resultDesk : resultDesk
        });
        alert('A search was submitted: ' + JSON.stringify(this.state.resultDesk)+"spaceID::"+values.spaceId+"Display ?"+this.state.displayResult);
        Object.assign(values,{});
        Object.assign(resultDesk,{});
    }



    render() {

        if (this.props && this.props.errSites !== null) {
            return (<div>
                <div className="alert alert-danger" role="alert">
                    {this.props.err} </div> <p> {this.props.err}</p> </div>);
        } else {
            return (
                <div>
                    <Form  model="searchTerm" onSubmit={(values)=>this.handleSubmit(values)}>
                        <label>Choose the site</label>
                        <Control.select model=".siteId" name="siteId" onChange={()=>this.updateOptions}>
                            {this.props.sites.map(site =>
                                <option key={site.name} value={site.id} > {site.name}</option>
                            )}
                        </Control.select>
                        <label>Choose the floor</label>
                        <Control.select model=".floorId" name="floorId">
                            {this.props.floors.map(floor =>
                                <option key={floor.id} value={floor.id}> {floor.num}</option>
                            )}
                        </Control.select>
                        <label>Choose the spaces </label>
                        <Control.select model=".spaceId" name="spaceId" onChange={() => this.updateOptions}>
                            {this.props.spaces.map(space=>
                            <option key={space.id} value={space.id} >{space.num}</option>
                            )}
                        </Control.select>
                        <Button variant="light" type="submit"> <i className="fa fa-search-minus"></i></Button>
                    </Form>
                    <SearchResult  found={this.state.displayResult} items={this.state.resultDesk} postSit={this.props.postSit} sittings={this.props.sittings}/>
                </div>)


        }

    }

}

export default SearchForm;
