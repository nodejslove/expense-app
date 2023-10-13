import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { AppService } from 'src/app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto[] {
    const result = this.appService.getAllReports(type);
    return result;
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.appService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body()
    body: UpdateReportDto,
  ): ReportResponseDto {
    return this.appService.updateReport(id, type, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.deleteReport(id, type);
  }
}
