import MealListTableHeader from "./MealListTableHeader";
import MealListTableBody from "./MealListTableBody";

const MealListTable = ({ events }) => {
  return (
    <div className="table-con">
      <table className="table">
        <MealListTableHeader />
        <MealListTableBody events={events} />
      </table>
    </div>
  );
};

export default MealListTable;
