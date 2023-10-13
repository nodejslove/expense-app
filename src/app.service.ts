import { Injectable } from '@nestjs/common';
import { reports, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';

interface Report {
  amount: number;
  source: string;
}
interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return reports.data.filter((report) => report.type == type);
  }

  getReportById(type: ReportType, id: string) {
    const result = reports.data.filter(
      (report) => report.type == type && report.id == id,
    );
    return result;
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    reports.data.push(newReport);
    return { msg: 'report Created', data: newReport };
  }

  updateReport(id: string, type: ReportType, body: UpdateReport) {
    const reportIndex = reports.data.findIndex(
      (report) => report.id === id && report.type == type,
    );
    if (reportIndex === -1) {
      return `Report with id: ${id} not found`;
    }
    reports.data[reportIndex] = {
      ...reports.data[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return reports.data[reportIndex];
  }

  deleteReport(id: string, type: ReportType) {
    const reportIndex = reports.data.findIndex(
      (report) => report.id === id && report.type == type,
    );
    if (reportIndex === -1) {
      return `Report with id: ${id} not found`;
    }
    const deletedReport = reports.data.splice(reportIndex, 1);
    return { msg: `${type} with id: ${id} deleted`, data: deletedReport };
  }
}
