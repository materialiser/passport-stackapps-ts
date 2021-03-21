export default class Profile {
  public id: number;
  public displayName: string;
  public profileUrl: string;
  public badgeCounts?: { [name: string]: number } = {};
  public reputation: number;
  public isEmployee: boolean;
  public lastModifiedDate: Date;
  public lastAccessDate: Date;
  public creationDate: Date;
  public userType: string;
  public userId: number;
  public link: string;
  public acceptRate: number;
  public location?: string;
  public website?: string;
  public photos?: string[];
  public reputationChange: { [name: string]: number } = {};
  public provider: string = "";
  public _raw: string = "";
  public _json: any = {};

  public constructor(obj: any) {
    if (typeof obj === "string") {
      obj = JSON.parse(obj);
    }

    this.id = obj.account_id;
    this.displayName = obj.display_name;
    this.profileUrl = obj.link;
    this.badgeCounts = obj.badge_counts;
    this.reputation = obj.reputation;
    this.isEmployee = obj.is_employee;
    this.lastModifiedDate = obj.last_modified_date;
    this.lastAccessDate = obj.last_access_date;
    this.creationDate = obj.creation_date;
    this.userType = obj.user_type;
    this.userId = obj.user_id;
    this.link = obj.link;
    this.acceptRate = obj.accept_rate;
    this.location = obj.location;
    this.reputationChange.year = obj.reputation_change_year;
    this.reputationChange.quarter = obj.reputation_change_quarter;
    this.reputationChange.month = obj.reputation_change_month;
    this.reputationChange.week = obj.reputation_change_week;
    this.reputationChange.day = obj.reputation_change_day;

    if (obj.profile_image) {
      this.photos = [obj.profile_image];
    }
  }
}
