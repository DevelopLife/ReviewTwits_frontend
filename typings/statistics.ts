export type DeviceType = 'MOBILE' | 'PC';

export type VisitInfo = {
  timeStamp: string;
  visitCount: number;
  previousCompare: number;
};

export type VisitGraphData = {
  isDifference: boolean;
} & VisitInfo;

export type DailyVisitGraphInfos = {
  range: string;
  visitInfo: VisitInfo[];
};

export type RecentVisitCounts = {
  todayVisit: number;
  yesterdayVisit: number;
  totalVisit: number;
};

export type VisitGraphInfos = {
  interval: '3d';
  range: '3mo';
  visitInfo: VisitInfo[];
} & RecentVisitCounts;

export type InflowInfos = {
  total: number;
  naver: number;
  daum: number;
  google: number;
  zoom: number;
  bing: number;
  yahoo: number;
  etc: number;
};
