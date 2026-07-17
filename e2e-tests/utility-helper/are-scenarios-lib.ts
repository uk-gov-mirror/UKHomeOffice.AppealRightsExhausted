export type AreScenarioData = {
  countryOfHearing: 'England & Wales' | 'Scotland' | 'Northern Ireland';
  appealStage: string;
  promulgationDate: string;
};

export const getAreScenarioDataById = (scenarioId: string): AreScenarioData => {
  switch (scenarioId) {
    case '1':
      return {
        countryOfHearing: 'England & Wales',
        appealStage: '06. First Tier IAC PTA to the UT - Out of Country',
        promulgationDate: '01/01/2019',
      };
    case '2':
      return {
        countryOfHearing: 'Scotland',
        appealStage: '11. Upper Tribunal IAC - In Country PTA to review UT determination',
        promulgationDate: '11/06/2016',
      };
    case '3':
      return {
        countryOfHearing: 'Northern Ireland',
        appealStage: '04. First Tier IAC Appeal - In Country Detained Fast Track',
        promulgationDate: '09/09/2019',
      };
    case '4':
      return {
        countryOfHearing: 'England & Wales',
        appealStage: '01. First Tier IAC Appeal - In Country Appeals',
        promulgationDate: '11/06/2022',
      };
    case '5':
      return {
        countryOfHearing: 'England & Wales',
        appealStage: '05. First Tier IAC PTA to the UT - In Country',
        promulgationDate: '11/06/2024',
      };
    default:
      throw new Error(`Invalid ARE Scenario ID: ${scenarioId}`);
  }
};

export const mapCountryLabelToFieldValue = (country: string): 'england-and-wales' | 'scotland' | 'northern-ireland' => {
  switch (country) {
    case 'England & Wales':
      return 'england-and-wales';
    case 'Scotland':
      return 'scotland';
    case 'Northern Ireland':
      return 'northern-ireland';
    default:
      throw new Error(`Invalid country value for ARE: ${country}`);
  }
};

export const splitDate = (date: string): { day: string; month: string; year: string } => {
  const dateParts = date.split('/');
  if (dateParts.length !== 3) {
    throw new Error(`Invalid date format for ARE: ${date}`);
  }

  return {
    day: dateParts[0],
    month: dateParts[1],
    year: dateParts[2],
  };
};
