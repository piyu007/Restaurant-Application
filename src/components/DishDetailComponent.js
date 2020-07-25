import React, {Component} from "react";
import {
    Modal,
    ModalBody,
    Breadcrumb,
    BreadcrumbItem,
    Label,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    ModalHeader
} from "reactstrap";
import Link from "react-router-dom/Link";
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.comment, values.author);
        alert('Comment has been successfully added');
        this.toggleModal();
    }

    toggleModal () {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return(
            <div className="row">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                              validators={{
                                                  required, minLength: minLength(3), maxLength: maxLength(15)
                                              }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" name="comment" className="form-control" rows="6"/>
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary" name="submit">Submit</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
    function RenderDish({dish,isLoading,errMess}) {
        if (isLoading) {
            return (
                <Loading/>
            );
        }
        else if (errMess) {
            return (
                <h4>{errMess}</h4>
            );
        }
        else if (dish) {
            return (
                <Card>
                    <CardImg src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (<div></div>);
        }
    }
    function RenderComments({comments, dishId, postComment, commentErrMess}) {
        if (commentErrMess) {
            return (
                <h4>{commentErrMess}</h4>
            );
        }
        else {
            const formatDate = (dateString) => {
                const options = Intl.DateTimeFormatOptions = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };
                return new Date(dateString).toLocaleDateString([], options);
            };
            const commentsMenu = comments.map((comment) => {
                const date = formatDate(comment.date);
                return (
                    <div key={comment.id}>
                        {comment.comment}
                        <p>-- {comment.author} , {date}
                        </p>
                    </div>
                );
            })
            if (comments != null) {
                return (
                    <div className="container">
                        <div className="row">
                            <h4>Comments</h4>
                            <ul className="list-group">
                                {commentsMenu}
                            </ul>
                        </div>
                        <div className="row">
                            <CommentForm dishId={dishId} postComment={postComment}/>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div></div>
                );
            }
        }
    }
    const DishDetail = (props) => {
            const dish = props.dish;
            if(dish) {
                return (
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="row">
                            <div className="col-12 col-md-5 mt-1">
                                <RenderDish dish={dish} isLoading={props.isLoading} errMess={props.errMess}/>
                            </div>
                            <div className="col-12 col-md-5 mt-1">
                                <RenderComments comments={props.comment}
                                                commentErrmess={props.commentErrMess}
                                                dishId={props.dish.id}
                                                postComment={props.postComment}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                return (<div><Loading/></div>);
            }
    }
export default DishDetail;