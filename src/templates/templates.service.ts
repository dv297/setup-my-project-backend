import { Injectable } from '@nestjs/common';
import { Template } from './template.model';
import * as uuid from 'uuid/v1';
import { CreateTemplateDto } from './dto/create-template.dto.';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { GetTemplatesFilterDto } from './dto/get-templates-filter.dto';

@Injectable()
export class TemplatesService {
  private templates: Template[] = [];

  getTemplates(getTemplatesFilterDto: GetTemplatesFilterDto): Template[] {
    if (Object.keys(getTemplatesFilterDto).length == 0) {
      return this.templates;
    }

    if (getTemplatesFilterDto.search) {
      return this.templates.filter((template) => {
        return template.name.toLowerCase().includes(getTemplatesFilterDto.search.toLowerCase());
      });
    }
  }

  getTemplateById(id: string): Template {
    return this.templates.find((template) => template.id === id);
  }

  deleteTemplateById(id: string): void {
    this.templates = this.templates.filter((template) => template.id !== id);
  }

  updateTemplateById(id: string, updateTemplateDto: UpdateTemplateDto): void {
    this.templates = this.templates.map((template) => {
      if (template.id !== id) {
        return template;
      }

      return {
        ...template,
        ...updateTemplateDto,
      };
    });
  }

  createTemplate(createTemplateDto: CreateTemplateDto): Template {
    const { name, description } = createTemplateDto;

    const template: Template = {
      id: uuid(),
      name,
      description,
    };

    this.templates.push(template);
    return template;
  }
}
