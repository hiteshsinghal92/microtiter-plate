import React, { useMemo, useState, useCallback } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

/**
 * DataUpload component handles CSV file upload.
 */
const DataUpload = ({ onDataLoaded, fileError, setFileError }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile ? selectedFile.type : "";
    if (fileType !== "text/csv") {
      setError("Please upload a CSV file.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  }, []);

  const handleFileUpload = useCallback(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onDataLoaded(e.target.result);
      };
      reader.onerror = () => {
        setError("Error reading file.");
      };
      reader.readAsText(file);
    }
  }, [file, onDataLoaded]);

  const fileInput = useMemo(
    () => (
      <Row className="d-flex flex-column bd-highlight mb-3 justify-content-center align-items-center">
        <h4>Please Upload CSV File</h4>
        <Col className="p-2 bd-highlight d-flex justify-content-center" md={4}>
          <Form.Group>
            <InputGroup hasValidation>
              <Form.Control
                type="file"
                isInvalid={!!error}
                required
                onChange={(e) => { handleFileChange(e); setFileError(""); }}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="p-2 bd-highlight d-flex justify-content-center">
          <Button
            type="button"
            variant="primary"
            disabled={!file}
            onClick={handleFileUpload}
          >
            Upload File
          </Button>
        </Col>
      </Row>
    ),
    [file, error, handleFileChange, handleFileUpload, setFileError]
  );

  return (
    <section className="text-center mt-4">
      {fileInput}
      {fileError && <span className="text-danger">{fileError}</span>}
    </section>
  );
};

export default React.memo(DataUpload);
