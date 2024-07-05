import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Repository } from 'typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>) {
  }

  async create(createCountryDto: CreateCountryDto) {
    const city = this.countriesRepository.create(createCountryDto);

    return await this.countriesRepository.save(city);
  }

  async findAll() {
    return await this.countriesRepository.find();
  }

  async findOne(id: number) {
    return await this.countriesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCountryto: UpdateCountryDto) {
    const country = await this.findOne(id);
    if (!country) {
      throw new NotFoundException();
    }

    Object.assign(country, updateCountryto);

    return await this.countriesRepository.save(country);
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    if (!country) {
      throw new NotFoundException();
    }

    return await this.countriesRepository.remove(country);
  }
}