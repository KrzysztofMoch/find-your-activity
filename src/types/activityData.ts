import activity from './activity';

type activityData = {
  activity: string;
  accessibility: number;
  activityType: activity | '';
  participants: number;
  price: number;
  key: number;
};

export default activityData;
