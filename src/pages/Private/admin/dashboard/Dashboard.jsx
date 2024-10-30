import React from "react";
import SummaryCard from "../../../../components/Private/admin/summaryCard/SummaryCard";
import OverviewChart from "../../../../components/Private/admin/overviewChart/OverviewChart";
import BookedServicesChart from "../../../../components/Private/admin/overviewChart/BookedServicesChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full px-10 py-5">
      <SummaryCard />
      <div className="flex flex-col items-center gap-8 mt-10">
        <OverviewChart />
        <BookedServicesChart />
      </div>
    </div>
  );
};

export default Dashboard;
