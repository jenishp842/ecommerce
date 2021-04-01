/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AttributeTemplate from './AttributeTemplate.jsx';
import TextTemplate from './TextTemplate.jsx';
import ThumbnailTemplate from './ThumbnailTemplate.jsx';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  marginBottom: '15px',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {

    const { arrayHelpers } = this.props
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    arrayHelpers.swap(result.source.index, result.destination.index)

    this.setState({
      items,
    });
  }

  deleteAttributeTemplate = (index) => {
    const { arrayHelpers } = this.props;
    arrayHelpers.remove(index);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({
        items: newProps.data
      });
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const {
      setFieldTouched, values, errors, touched, setFieldValue, handleAutoSaveCheckbox, checkAutoSave, autoSaveData, autoSaveFlag, checkAutoSaveBtn
    } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.items && this.state.items.length > 0 && this.state.items.map((item, index) => (
                <Draggable key={`${index + 1}`.toString()} draggableId={`${index + 1}`.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {item.type === 'attribute'
                        ? (
                          <div key={index}>
                            <AttributeTemplate
                              setFieldTouched={setFieldTouched}
                              values={values}
                              errors={errors}
                              touched={touched}
                              setFieldValue={setFieldValue}
                              index={index}
                              deleteAttributeTemplate={this.deleteAttributeTemplate}
                              handleAutoSaveCheckbox={handleAutoSaveCheckbox}
                              checkAutoSave={checkAutoSave}
                              autoSaveFlag={autoSaveFlag}
                              autoSaveData={autoSaveData}
                              checkAutoSaveBtn={checkAutoSaveBtn}
                            />
                          </div>
                        ) : null}
                      {item.type === 'text'
                        ? (
                          <div key={index}>
                            <TextTemplate
                              setFieldTouched={setFieldTouched}
                              values={values}
                              errors={errors}
                              touched={touched}
                              setFieldValue={setFieldValue}
                              index={index}
                              deleteAttributeTemplate={this.deleteAttributeTemplate}
                            />
                          </div>
                        ) : null}
                      {item.type === 'image'
                        ? (
                          <div key={index}>
                            <ThumbnailTemplate
                              setFieldTouched={setFieldTouched}
                              values={values}
                              errors={errors}
                              touched={touched}
                              setFieldValue={setFieldValue}
                              index={index}
                              deleteAttributeTemplate={this.deleteAttributeTemplate}
                            />
                          </div>
                        ) : null}


                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext >
    );
  }
}

export default DragAndDrop;
