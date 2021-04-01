import React from 'react';
import Loader from '../../component/Loader.jsx';

const RecentAttribute = (props) => {
  const {
    attribute, recentAttributeLoader, addRecentAttribute,
  } = props;

  return (
    <>
      {recentAttributeLoader
        && <Loader />
        || (
          <div className="tab-pane fade show active" id="recent" role="tabpanel">
            {attribute.length > 0 ? attribute.map((att, index) => {

              return (
                <RecentAttributeOne index={index} att={att} addRecentAttribute={addRecentAttribute} />
              )
            }) : <div className="no-data">No Recent data</div>}

          </div>
        )}
    </>
  );
};

export default RecentAttribute;


const RecentAttributeOne = (props) => {
  const { att, index, addRecentAttribute } = props;

  return (
    <div class="org-border br-6 p-2 mb-3 recent-attribute-block" key={index} onDoubleClick={() => addRecentAttribute(att)}>
      <div class="d-flex flex-wrap">
        <div class="col f-16 f-m flex-grow-2">
          Attribute Name
    </div>
        <div class="col f-16 f-b">
          {att.attribute_name || ''}
        </div>
      </div>
      <div class="d-flex flex-wrap">
        <div class="col f-16 f-m">
          Attribute Data Type
    </div>
        <div class="col f-16 f-b">
          {att.dataType || att.description || ''}
        </div>
      </div>
    </div>
  );
};