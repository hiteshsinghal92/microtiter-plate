import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import DataUpload from "../DataUpload";
import { parseCSV } from "../../services/csvParser";
import SpinerLoader from "../common/SpinerLoader";
const HeatMap = lazy(() => import("../HeatMap"));
const MetricsList = lazy(() => import("../MetricsList"));

/**
 * @description HomePage component handles data upload and heatmap visualization.
 */
const HomePage = () => {

  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [fileError, setFileError] = useState("");
  const [isFileParse, setIsFileParse] = useState(false);

  const handleDataLoaded = useCallback(async (csvData) => {
    setFileError("");
    setIsFileParse(true);
    setData([]);
    setSelectedMetric("");
    setMetrics([]);
    try {
      const parsedData = await parseCSV(csvData);
      setData(parsedData);
      setMetrics(
        Object.keys(parsedData[0]).filter((key) => !isNaN(parsedData[0][key]))
      );
      setSelectedMetric(
        Object.keys(parsedData[0]).filter((key) => !isNaN(parsedData[0][key]))[0]
      );
    } catch (error) {
      setFileError(error.message);
    } finally {
      setIsFileParse(false);
    }
  }, []);

  const metricsList = useMemo(
    () => (
      <Suspense fallback={<SpinerLoader />}>
        <MetricsList
          metrics={metrics}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />
      </Suspense>
    ),
    [metrics, selectedMetric, setSelectedMetric]
  );

  const heatMap = useMemo(
    () => (
      <Suspense fallback={<SpinerLoader />}>
        <HeatMap data={data} selectedMetric={selectedMetric} />
      </Suspense>
    ),
    [data, selectedMetric]
  );


  return (
    <>
      <DataUpload onDataLoaded={handleDataLoaded} fileError={fileError} setFileError={setFileError} />
      {isFileParse && (
        <SpinerLoader />
      )}
      {metrics.length > 0 && metricsList}
      {data.length > 0 && heatMap}
    </>
  );
};

export default HomePage;
