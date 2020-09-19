import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Rule.scss';
import ConfigObject from './ConfigObject'
import Icon from '@material-ui/core/Icon';
import {Box} from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import Expression from './Expression';
import Action from './Action';
export  class Rule extends Component {
    state = {
        tasks: [
            {name:"DesnsityConfig",category:"wip", bgcolor: "yellow",id:"1",command:"None", 'attributes':[{
                'name':'peoplecount',
                'type':'INTEGER',
            }]},
            {name:"SocialDistanceConfig", category:"wip", bgcolor:"pink",id:"2",command:"None", 'attributes':[{
                'name':'distance',
                'type':'float',
            }]},
            {name:"Vue", category:"wip", bgcolor:"skyblue",id:"3",command:"None", 'attributes':[{
                'name':'test',
                'type':'INTEGER',
                },
                {
                    'name':'test2',
                    'type':'STRING',
                }
            ]}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        console.log("OnDrop:"+JSON.stringify(cat) + " id:"+id);
       let id = ev.dataTransfer.getData("id");
       console.log("OnDrop:"+JSON.stringify(cat) + " id:"+id);
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

     componentDidMount(ev){
        let expression = this.refs.expression1;
        const domNode = ReactDOM.findDOMNode(expression);
        console.log(JSON.stringify(domNode.getBoundingClientRect()));
        console.log(domNode.childElementCount);
        for(let i=0; i< domNode.childElementCount; i++){
            let child=domNode.children[i];
            // console.log(JSON.stringify(child.getState()));
            console.log(JSON.stringify(child.getBoundingClientRect()));
        }
    }
    render() {
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <ConfigObject draggable name={t.name} key={t.id}   id={t.id} command={t.command}
                    onDragStart = {(e) => this.onDragStart(e, t.name) } attributes={t.attributes}
                    />
    
            );
        });

        return (
            <div className='rulesmain'>
                <Row xs="1" className='ruleheader'>
                    <label  className="ruleheader">Rule</label>
                </Row>
                <Row xs="4">
                    <Col>
                        <div className="wip" 
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "wip")}}>
                            <span className="task-header">Cofig Objects</span>
                            {tasks.wip}
                        </div>
                    </Col>
                    <Col>
                        <div className="droppable" 
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>this.onDrop(e, "complete")}>
                            <span className="task-header">Selected Config Object</span>
                            {tasks.complete}
                        </div>
                    </Col>
                    <Col>
                        <div className="ptscolumn" ref='expression1' >
                        <span className="task-header">Expression</span>
                            <Expression operation='update' data='DensityObject.peoplecount     >     10' configObjectList={tasks.complete}/>
                            <Expression operation='view' data='DensityObject.peoplecount    >     10' configObjectList={tasks.complete}/>
                        </div>
                    </Col>
                    <Col><div className="ptscolumn" >
                            
                            <span className="task-header">Action</span>
                            <Action operation='view' data={{'id':'1','name':'DensityObject','command':'Send Email','eventtype':{'id':'1','name':'DensityViolation'}}}/>
                            
                            <Action operation='view' data={{'id':'1','name':'DensityObject','command':'Send Text','eventtype':{'id':'1','name':'DensityViolation'}}} />
                        
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Rule;