import React from "react";
import {Card, CardText, CardTitle, CardBody, CardSubtitle, CardImg} from "reactstrap";
import { FadeTransform } from 'react-animation-components';
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

function RenderCard({item, isLoading, errMess}) {

    if (isLoading) {
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else if(item){
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }
    else{
        return (
            <div></div>
        );
    }
}
function Home(props) {
    return(
        <div className="container">
           <div className="row align-items-start">
               <div className="col-12 col-md mt-1">
                   <RenderCard item={props.dish} isLoading={props.isLoading} errMess={props.errMess} />
               </div>
               <div className="col-12 col-md mt-1">
                   <RenderCard item={props.promotions} isLoading={props.promoLoading} errMess={props.promoErrMess}/>
               </div>
               <div className="col-12 col-md mt-1">
                   <RenderCard item={props.leaders} isLoading={props.leadersLoading} errMess={props.leadersErrMess}/>
               </div>
           </div>
        </div>
    );
}
export default Home;