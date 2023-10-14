import { Injectable } from '@nestjs/common';
import { reports, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}
interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return reports.data
      .filter((report) => report.type == type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const result = reports.data.find(
      (report) => report.type == type && report.id == id,
    );
    if (!result) return;

    return new ReportResponseDto(result);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    reports.data.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    id: string,
    type: ReportType,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportIndex = reports.data.findIndex(
      (report) => report.id === id && report.type == type,
    );
    if (reportIndex === -1) {
      return;
    }
    reports.data[reportIndex] = {
      ...reports.data[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDto(reports.data[reportIndex]);
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
