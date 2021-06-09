export default class Select2Promise {
  url: string;
  data: any;
  result?: { results: any[] };
  processResults: (data: any, params: any) => { results: any[] };
  constructor(url: string, data: any, processResults: (data: any, params: any) => { results: any[] }) {
    this.url = url;
    this.data = data;
    this.processResults = (data, params) => {
      this.result = processResults(data, params);
      return this.result;
    };
  }
}
