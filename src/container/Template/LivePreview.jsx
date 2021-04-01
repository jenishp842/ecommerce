import React from 'react';
import certi from "../../assets/img/certi.png";
import qr from "../../assets/img/qr.png";

const LivePreview = (props) => {
  const { attribute } = props;
  return (
    <div className="tab-pane fade show active" id="live" role="tabpanel">
      <div className="pr-0 min-fixHeight">

        {attribute.length > 0 && attribute.map((item) => {
          let text = '';
          if (item.attribute_dropdown === 'Date') {
            text = 'DD/MM/YYYY';
          } else if (item.attribute_dropdown === 'Number') {
            text = '00';
          } else if (item.attribute_dropdown === 'Boolean') {
            text = ' True/False';
          } else if (item.attribute_dropdown === 'Time') {
            text = 'HH:MM AM';
          } else if (item.attribute_dropdown === 'Text') {
            text = item.description || '';
          } else {
            text = 'XXXX';
          }
          return (
            <>
              <div className="d-flex flex-wrap">
                <div className="col-sm-4">
                  <h3 className="f-16 f-b">{item.attribute_name || ''}</h3>
                </div>
                <div className="col-sm-8">
                  <h3 class="f-16">
                    {item.attribute_name != '' && item.attribute_dropdown != '' ?
                      item.attribute_dropdown === 'Qr' ?
                        <div className="generateQr">
                          <img className="my-5 mx-auto d-block" src={qr} />
                        </div>
                        : item.attribute_dropdown === 'Image' ?
                          <div className="box-shd p-2 br-6 d-flex align-items-center justify-content-center text-center h-150">
                            <img className="img-fluid" src={certi} />
                          </div> : text
                      : ''}

                  </h3>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div >
  );
};

export default LivePreview;