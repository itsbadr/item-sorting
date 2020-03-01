import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from 'axios';

import './Items.css';
import './Button.css';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (  
      <ul>
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value} />
      ))}
    </ul>
  );
});

class Items extends Component {
  state = {
    roles: [],
    opacity: false,
    hidden: true
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/roles`)
    .then(res => {
        this.setState({ roles: res.data})
    })  
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    
    const role = this.state.roles[oldIndex]

    axios.post('http://localhost:5000/role', {
      role: role,
      newPosition: this.state.roles[newIndex].position
    })
    
    this.setState(({roles}) => ({
      roles: arrayMove(roles, oldIndex, newIndex),
      opacity: false
    }))

  }

  btnClick = () => {
    axios.get(`http://localhost:5000/roles`)
    .then(res => {
        this.setState({ roles: res.data, hidden: false })
    })  
  }


  render() {
    return  ( 
      <React.Fragment>

      <div className="btnDiv">
        <button className="btn"
                onClick={this.btnClick}>
			Refresh
        </button>
      </div>  

      <div style={ { opacity: this.state.opacity ? '0.7' : '1' } } className="container">
        <SortableList 
        items=
        {
          this.state.roles.map( role =>  {
            if (role.name.startsWith(":")) return <h1 className="test">{role.name.toUpperCase()}</h1>
            if (role.color === "#000000") return <ul className="test">{role.name}</ul>
            else return <ul className="test" style={{ backgroundColor: role.color, color: 'black' }}>{role.name}</ul>
          })
        } 
        onSortEnd={this.onSortEnd}
        onSortMove=
        {
          () => { this.setState( { opacity: true } ) }
        }
        lockAxis="y"
        useWindowAsScrollContainer={true}
        lockToContainerEdges={true} />
      </div>
	  
	</React.Fragment>
    )
  }
  
}

export default Items;
