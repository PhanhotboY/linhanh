import * as SurveyCore from 'survey-core';
import * as SurveyReactUi from 'survey-react-ui';

import 'survey-core/defaultV2.css';

const { Model } = SurveyCore;
const { Survey } = SurveyReactUi;

export default function SurveyComponent({ jsonSurvey }: { jsonSurvey: any }) {
  const model = new Model(jsonSurvey);

  return <Survey model={model} />;
}
