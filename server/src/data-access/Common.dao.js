import { updateOrCreate } from "./Basic.dao.js";

const getAllBoardGrades = async (req) => {
  try {
    const queryString = `SELECT boardGradeId value, boardGrade text FROM BoardGrades`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

const getAllSalaryGroups = async (req) => {
  try {
    const queryString = `SELECT SalaryGroupId value, salaryGroup text FROM SalaryGroups`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

const getApplicationSteps = async (req) => {
  try {
    const queryString = `SELECT AppStepId stepNo, AppSteps step FROM ApplicationSteps`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

const getDashboardData = async (req) => {
  try {
    const queryString = `select
    (select count(*) from Applications where applications.Status = 'PENDING') NoOfActiveVacancies,  
    (select COUNT(*) from Vacancies where Vacancies.Status = 'ACT') NoOfPendingApplications`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllBoardGrades,
  getAllSalaryGroups,
  getApplicationSteps,
  getDashboardData,
};
