import React, { useCallback, useMemo } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

/**
 * 
 * @description Create Heat Map table and show Tooltio ob hover
 */

const HeatMap = ({ data, selectedMetric }) => {

  /**
   * @description define the color code of heatmap table
   */
  const getColor = useCallback(
    (value) => {
      const min = Math.min(...data.map((d) => d[selectedMetric]));
      const max = Math.max(...data.map((d) => d[selectedMetric]));
      const ratio = (value - min) / (max - min);
      const red = Math.floor(255 * ratio);
      const blue = 255 - red;
      return `rgb(${red}, 0, ${blue})`;
    },
    [data, selectedMetric]
  );


  const heapData = useMemo(() => {
    return data.map((well, index) => (
      <OverlayTrigger
        key={index}
        trigger={["hover", "focus"]}
        placement="auto"
        overlay={
          <Popover id={`popover-${index}`}>
            <Popover.Header as="h2" className="text-center">Details Information</Popover.Header>
            {Object.keys(well).map((key, indexWell) => (
              <Popover.Body as="div" key={indexWell} style={{ padding: '5px' }}>
                {<strong>{key ? key : 'S.N'} : </strong>}{well[key]}
              </Popover.Body>
            ))}
          </Popover>
        }
      >
        <div
          key={index}
          className="well"
          style={{ backgroundColor: getColor(well[selectedMetric]) }}
        ></div>
      </OverlayTrigger>
    ));
  }, [data, selectedMetric, getColor]);


  return (
    <div className="heatmap mb-4 mt-4">
      {heapData}
    </div>
  );
};

export default React.memo(HeatMap);
