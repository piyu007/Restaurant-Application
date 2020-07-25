import React from "react";
import {Card, CardTitle, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import Link from "react-router-dom/Link";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

    function MenuItem({dish}) {
        return(
            <Link to={`/menu/${dish.id}`}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </Link>
        );
    }
    const Menu = (props) => {
        if(props.dishes.isLoading === true){
            return(
                <Loading />
            );
        }
        else if(props.dishes.errMess){
            return (
                <h4>{props.dishes.errMess}</h4>
            );
        }
        else {
            const menu = props.dishes.dishes.map((dish) => {
                return (
                    <div className="col-12 col-md-5 mt-1">
                        <MenuItem dish={dish}/>
                    </div>
                );
            })
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <h3>Menu</h3>
                        <br/>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        }
    }
export default Menu;