import useStatistics from 'hooks/queries/statistics';
import useDates from 'hooks/useDates';
import type { StatisticsRange } from 'typings/chart';

interface useVisitorChartProps {
  projectId: string;
  range: StatisticsRange;
  interval: StatisticsRange;
}

const useVisitorChart = ({
  projectId,
  range,
  interval,
}: useVisitorChartProps) => {
  const {
    referenceDate,
    focusedDate,
    changeFocusedDate,
    changeReferenceDateIntoPreviousReferenceDate,
    changeReferenceDateIntoNextReferenceDate,
  } = useDates();

  const { useVisitGraphInfosQuery } = useStatistics(projectId);

  const visitInfos = useVisitGraphInfosQuery({
    range,
    interval,
  }).data?.data?.visitInfo.map(({ timeStamp }) => new Date(timeStamp));

  return {
    referenceDate,
    focusedDate,
    visitInfos: useVisitGraphInfosQuery({ range, interval }).data?.data
      ?.visitInfo,
    onClickBar: changeFocusedDate,
    onClickPrevButton: () =>
      visitInfos?.length &&
      changeReferenceDateIntoPreviousReferenceDate(visitInfos),
    onClickNextButton: () =>
      visitInfos?.length &&
      changeReferenceDateIntoNextReferenceDate(visitInfos),
  };
};

export default useVisitorChart;
