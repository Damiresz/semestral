export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export class BaseUser {
  constructor(
    public id: string,
    public name: string
  ) {}

  getName() {
    return this.name;
  }
}

export class UserProgress extends BaseUser {
  constructor(
    id: string,
    name: string,
    public level: Level,
    public progress: number
  ) {
    super(id, name);
  }

  getProgressInfo() {
    return {
      name: this.getName(),
      level: this.level,
      progress: this.progress
    };
  }

  getProgressColor() {
    if (this.progress >= 80) return "primary";
    if (this.progress >= 60) return "sky";
    return "green";
  }
}

export class UserProgressManager {
  private users: UserProgress[] = [];

  addUser(user: UserProgress) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find(user => user.id === id);
  }

  getUsersByLevel(level: Level) {
    return this.users.filter(user => user.level === level);
  }
} 