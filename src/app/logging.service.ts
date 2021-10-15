export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log("old", this.lastlog);
    this.lastlog = message;
  }
}
