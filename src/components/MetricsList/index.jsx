import React from "react";
import { Form } from "react-bootstrap";

/**
 * MetricsList component allows the user to select a metric for visualization.
 */
const MetricsList = ({ metrics, selectedMetric, setSelectedMetric }) => {
  return (
    <Form.Group controlId="metricSelect" className="mt-3">
      <Form.Label>Select Metric:</Form.Label>
      <Form.Control
        as="select"
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
      >
        <option value="">
          Select Matrix
        </option>
        {metrics.map(
          (metric) =>
            metric && (
              <option key={metric} value={metric}>
                {metric}
              </option>
            )
        )}      </Form.Control>
    </Form.Group>
  );
};

export default React.memo(MetricsList);
