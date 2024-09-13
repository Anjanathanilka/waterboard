import {
  getAllBoardGrades,
  getAllSalaryGroups,
  getApplicationSteps,
  getDashboardData,
} from "../data-access/Common.dao.js";
import { getUpcommingInterviews } from "../data-access/Vacancy.dao.js";

const chartData = [
  {
    month: "Jul",
    selected: 1,
    rejected: 0,
  },
  {
    month: "Aug",
    selected: 1,
    rejected: 1,
  },
  {
    month: "Sep",
    selected: 2,
    rejected: 0,
  },
  {
    month: "Nov",
    selected: 0,
    rejected: 1,
  },
];

const getMasterData = async (req) => {
  try {
    const boardGrades = await getAllBoardGrades(req);
    const salaryGroups = await getAllSalaryGroups(req);
    const appSteps = await getApplicationSteps(req);
    const dashboardData = await getDashboardData(req);
    const upcomingInterviews = await getUpcommingInterviews(req);

    let data = {};
    data.boardGrades = boardGrades;
    data.salaryGroups = salaryGroups;
    data.appSteps = appSteps;
    data.dashboardData = dashboardData;
    data.chartData = chartData;
    data.upcomingInterviews = upcomingInterviews;
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export { getMasterData };
