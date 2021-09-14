import React, { Component } from 'react';
import Dishes from '../../data/dishes';
import COMMENTS from '../../data/comments';
import MenuItem from './MenuItem';
import DishDetail from './DishDetail';
import { CardColumns, Modal, ModalBody, Button } from 'reactstrap'
import ModalFooter from 'reactstrap/lib/ModalFooter';

class Menu extends Component {
    state = {
        dishes: Dishes,
        comments: COMMENTS,
        selectedDish: null,
        modalOpen: false
    }

    onDishSelect = dish => {
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
    }
    toogleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render() {
        const menu = this.state.dishes.map(item => {
            return (
                <MenuItem
                    dish={item}
                    key={item.id}
                    onDishSelect={() => this.onDishSelect(item)} />
            );
        })
        let dishDetail = null;
        if (this.state.selectedDish != null) {
            const comments = this.state.comments.filter(comment =>
                comment.dishId === this.state.selectedDish.id
            )
            dishDetail = <DishDetail dish={this.state.selectedDish} comments={comments} />
        }
        return (
            <div className="container">
                <div className="row">
                    <CardColumns>
                        {menu}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen} onClick={this.toogleModal}>
                        <ModalBody>
                            {dishDetail}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toogleModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        );
    }
}

export default Menu;