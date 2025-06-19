import * as SurveyCore from "survey-core";
import * as SurveyReactUi from "survey-react-ui";

import "survey-core/survey-core.min.css";

const { Model } = SurveyCore;
const { Survey } = SurveyReactUi;

export default function SurveyComponent({ jsonSurvey }: { jsonSurvey: any }) {
  const model = new Model(jsonSurvey);

  return <Survey model={model} />;
}
