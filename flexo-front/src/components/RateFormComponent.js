import {Control, Form} from "react-redux-form";
import {Button} from "react-bootstrap";
import React from "react";
const RATES_NUM =[1,2,3,4,5];

export default function RateForm({displayRate, handleSubmitRate}) {
    if (displayRate){
        return  (<div name="rateF" >
            <Form model="rating"  name="rate"  onSubmit={values => handleSubmitRate(values)}>
                <Control.select model=".rate" name="rate">
                    {RATES_NUM.map(r =>
                        <option key={r}  value={r}>{r}</option>
                    )}.concat(<option key="default" value="">Choose a rate</option>)
                </Control.select>
                <label>Your comment</label>
                <Control.text model=".comment"></Control.text>
                <Button  type="submit" variant="outline-primary"> Submit </Button>
            </Form>
        </div>);
    }else{
        return(<div></div>);
    }
}
