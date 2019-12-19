export default class Select2Promise {
  constructor(url, data, processResults) {
    this.url = url;
    this.data = data;
    this.processResults = (data, params) => {
      this.result = processResults(data, params);
      return this.result;
    };
  }
}
