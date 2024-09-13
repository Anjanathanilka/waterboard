import { ActiveStatus, RecruitementType } from "../constant/common.js";
import * as VacancyDao from "../data-access/Vacancy.dao.js";

const createVacancy = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const vacancy = await VacancyDao.createOrUpadateVacancy(req.body);
    res.status(201).json({ result: vacancy });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getVacanciesForApply = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getVacancyBySearch = async (req, res) => {
  try {
    // const title = new RegExp(searchQuery, "i"); // ignore
    //  console.log("DEBUG:", searchQuery);
    const vacancies = await VacancyDao.getVacanciesBySearch(req);
    vacancies.map((vacancy) => {
      vacancy.RecruitmentType =
        (vacancy.RecruitmentType === RecruitementType.EXTERNAL
          ? "External"
          : vacancy.RecruitmentType === RecruitementType.INTERNAL
          ? "Internal"
          : vacancy.RecruitmentType === RecruitementType.INTERNAL_EXTERNAL
          ? "Internal and External"
          : "Promotion") + " Recruitment";
    });
    res.status(200).json({ data: vacancies });
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getAllVacancies = async (req, res) => {
  try {
    let vacancies = await VacancyDao.getAllVacancies(req);
    vacancies.map((vacancy) => {
      vacancy.Status =
        vacancy.Status === ActiveStatus.ACTIVE ? "Open" : "Close";
      vacancy.RecruitmentType =
        (vacancy.RecruitmentType === RecruitementType.EXTERNAL
          ? "External"
          : vacancy.RecruitmentType === RecruitementType.INTERNAL
          ? "Internal"
          : vacancy.RecruitmentType === RecruitementType.INTERNAL_EXTERNAL
          ? "Internal and External"
          : "Promotion") + " Recruitment";
    });
    res.status(200).json({ data: vacancies });
  } catch (e) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(e);
  }
};

export { createVacancy, getVacancyBySearch, getAllVacancies };
