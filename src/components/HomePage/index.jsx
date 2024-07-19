import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import DataUpload from "../DataUpload";
import { parseCSV } from "../../services/csvParser";
import SpinerLoader from "../common/SpinerLoader";
import { Button } from "react-bootstrap";
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
  const [isHeatMapShow, setIsHeatMapShow] = useState(false);

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
        <HeatMap data={data} selectedMetric={selectedMetric} metrics={metrics} />
      </Suspense>
    ),
    [data, selectedMetric]
  );


  const resetHeatmapData = () => {
    setFileError("");
    setData([]);
    setSelectedMetric("");
    setMetrics([]);
    setIsHeatMapShow(false)
  }


  return (
    <>
      {!isHeatMapShow && <DataUpload onDataLoaded={handleDataLoaded} fileError={fileError} setFileError={setFileError} /> } 
      {isFileParse && (
       <>
        <SpinerLoader />
       </>
      )}
      {data.length > 0 && !isHeatMapShow && <div className="text-center"> <Button onClick={() => setIsHeatMapShow(true)}> Show Heatmap </Button></div>}
      {data.length > 0 && isHeatMapShow && <div className="text-center"> <Button onClick={resetHeatmapData}> Go to Upload File </Button></div>}
      

      {isHeatMapShow && metrics.length > 0 && metricsList}
      {isHeatMapShow && data.length > 0 && heatMap}
    </>
  );
};

export default HomePage;
