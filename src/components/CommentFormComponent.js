import React, { Component } from 'react';
import { Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length > len);

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        // console.log("Current state is " + JSON.stringify(values));
        // alert("Current state is : " + JSON.stringify(values));
        console.log(values);
        console.log("dish id : " + this.props.dishId + " rating " + values.rating + " author " + values.author + " commment" + values.comment);
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>

                <Button outline onClick={this.toggleModal}>
                    Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select defaultValue="5" model=".rating" id="rating" name="rating" className="form-control" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3)}} />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters' }} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" resize="none" rows="6" className="form-control" validators={{ required }} />
                                    <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>

                        {/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Label htmlFor="rating">Rating</Label>
                            <Col>
                                <Control.select model=".rating" name="rating" id="rating"
                                    className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Col>
                            <Label htmlFor="author">Your Name</Label>
                            <Col>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(2)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters'
                                    }}
                                />
                            </Col>

                            <Label htmlFor="comment">Comment</Label>
                            <Col>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control" />
                            </Col>
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </Col>
                        </LocalForm> */}
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

export default Comment;