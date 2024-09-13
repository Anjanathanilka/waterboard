const ApplicationStatus = {
  PENDING: "PENDING",
  SELECTED: "SELECTED",
  REJECTED: "REJECTED",
};

const ActiveStatus = {
  ACTIVE: { short: "ACT", desc: "ACTIVE" },
  INACTIVE: { short: "INA", desc: "INACTIVE" },
};

const RecruitementType = {
  INTERNAL: "INT",
  EXTERNAL: "EXT",
  INTERNAL_EXTERNAL: "INT_EXT",
  PROMOTION: "PROMOTION",
};

export { ApplicationStatus, ActiveStatus, RecruitementType };
