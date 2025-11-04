import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import BoxplotCharts from "../components/charts/BoxplotCharts";
import BubbleChart from "../components/charts/BubbleChart";
import CandleStickChart from "../components/charts/CandleStickChart";
import ColumChart from "../components/charts/ColumChart";
import HeatmapChart from "../components/charts/HeatmapChart";
import LineChart from "../components/charts/LineChart";
import MixedChart from "../components/charts/MixedChart";
import PieChart from "../components/charts/PieChart";
import PolarAreaChart from "../components/charts/PolarAreaChart";
import RadarChart from "../components/charts/RadarChart";
import RadialbarChart from "../components/charts/RadialbarChart";
import ScatterChart from "../components/charts/ScatterChart";
import TimelineChart from "../components/charts/TimelineChart";
import TreemapChart from "../components/charts/TreemapChart";

const ChartPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Charts</h6>
        </div>
      </div>
      <LineChart />
      <AreaChart />
      <ColumChart />
      <BarChart />
      <MixedChart />
      <TimelineChart />
      <CandleStickChart />
      <BoxplotCharts />
      <BubbleChart />
      <ScatterChart />
      <HeatmapChart />
      <TreemapChart />
      <PieChart />
      <RadialbarChart />
      <RadarChart />
      <PolarAreaChart />
    </div>
  );
};
export default ChartPage;
