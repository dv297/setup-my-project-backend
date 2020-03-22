import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Template } from './template.model';
import { CreateTemplateDto } from './dto/create-template.dto.';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { GetTemplatesFilterDto } from './dto/get-templates-filter.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Get()
  getAllTemplates(@Query() getTemplatesFilterDto: GetTemplatesFilterDto): Template[] {
    return this.templatesService.getTemplates(getTemplatesFilterDto);
  }

  @Get('/:id')
  getTemplateById(@Param('id') id: string): Template {
    return this.templatesService.getTemplateById(id);
  }

  @Patch('/:id')
  updateTemplateById(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    this.templatesService.updateTemplateById(id, updateTemplateDto);

    return {
      success: true,
    }
  }

  @Post()
  createTemplate(@Body() createTemplateDto: CreateTemplateDto): Template {
    return this.templatesService.createTemplate(createTemplateDto);
  }

  @Delete('/:id')
  deleteTemplateById(@Param('id') id: string) {
    this.templatesService.deleteTemplateById(id);

    return {
      success: 'true'
    }
  }
}
